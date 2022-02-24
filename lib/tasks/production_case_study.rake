# frozen_string_literal: true

require_relative "../../config/environment"
require "matrix"

# Download csvs from production and save them:
# \copy (SELECT * FROM case_study_articles) TO case_study_articles.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)
# \copy (SELECT * FROM case_study_companies) TO case_study_companies.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)
# \copy (SELECT * FROM case_study_contents) TO case_study_contents.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)
# \copy (SELECT * FROM case_study_industries) TO case_study_industries.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)
# \copy (SELECT * FROM case_study_sections) TO case_study_sections.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)
# \copy (SELECT * FROM case_study_skills) TO case_study_skills.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)

namespace :production_case_study do
  task seed: :environment do
    destroy_existing
    populate_all
  end

  task get_embeddings: :environment do
    engine = "davinci"
    client = OpenAI::Client.new
    articles = articles_for_openai
    articles.in_groups_of(20, false).each do |group|
      embeddings = client.embeddings(engine: "text-search-#{engine}-doc-001", parameters: {input: group.pluck(:text)})
      group.each.with_index do |article, index|
        article[:embedding] = embeddings["data"][index]["embedding"]
      end
    end
    File.write("lib/tasks/data/case_studies/embeddings-#{engine}.yml", articles.to_yaml)
  end

  task :search_embeddings do
    engine = "davinci"
    client = OpenAI::Client.new
    articles = YAML.load_file("lib/tasks/data/case_studies/embeddings-#{engine}.yml")
    articles.each do |article|
      article[:article] = CaseStudy::Article.find(article[:id])
    end
    queries = [
      "acquire more customers for my fintech startup",
      "Create a podcast in the financial services sector",
      "Create content focused on the German market",
      "create funny B2B content",
      "devise a growth strategy aimed at developers audience",
      "I want to gain B2B search authority in a new space",
      "re-position my fintech brand based on qualitative research.",
      "Reposition manufacturing business as a service provider",
      "to design a mobile app experience to increase repeat customers"
    ]
    queries.each do |query|
      embedding = client.embeddings(engine: "text-search-#{engine}-query-001", parameters: {input: query})
      data = embedding["data"].first["embedding"]
      query_vector = Vector.elements(data)
      results = []
      articles.each do |article|
        article_vector = Vector.elements(article[:embedding])
        results << {
          similarity: query_vector.dot(article_vector) / (query_vector.magnitude * article_vector.magnitude),
          uid: article[:article].uid,
          title: article[:article].title
        }
      end
      sorted = results.sort_by { |r| r[:similarity] }.reverse.take(3)
      puts "-" * 100
      puts "Top 3 results for query with #{engine} embeddings engine: #{query}"
      columns = sorted.first.keys
      output = CSV.generate do |csv|
        csv << columns
        sorted.each { |row| csv << columns.map { |c| row[c] } }
      end
      puts output
    end
  end

  task upload: :environment do
    client = OpenAI::Client.new
    articles = articles_for_openai
    tempfile = Tempfile.new("openai_articles.jsonl").tap do |file|
      file.write(articles.map { |a| {text: a[:text], metadata: a[:id]}.to_json }.join("\n"))
    end
    upload = client.files.upload(parameters: {file: tempfile.path, purpose: "search"})
    puts "Uploaded #{articles.size} articles to OpenAI. File ID: #{upload["id"]}"
  end

  task search: :environment do
    client = OpenAI::Client.new
    file = "file-brc5l2Rzc2UPHp5tA2PgkdL3"
    queries = [
      "acquire more customers for my fintech startup",
      "Create a podcast in the financial services sector",
      "Create content focused on the German market",
      "create funny B2B content",
      "devise a growth strategy aimed at developers audience",
      "I want to gain B2B search authority in a new space",
      "re-position my fintech brand based on qualitative research.",
      "Reposition manufacturing business as a service provider",
      "to design a mobile app experience to increase repeat customers"
    ]
    queries.take(1).each do |query|
      search = client.search(engine: "text-babbage-001", parameters: {file:, query:, return_metadata: true})
      sorted_data = search["data"].sort_by { |d| d["score"] }.reverse
      top_results = []
      sorted_data.take(3).each do |d|
        article = CaseStudy::Article.find(d["metadata"])
        top_results << {
          uid: article.uid,
          score: d["score"],
          url: "https://app.advisable.com/case_studies/#{article.uid}",
          title: article.title
        }
      end
      puts "-" * 100
      puts "Top 3 results for query with babbage engine: #{query}"
      columns = top_results.first.keys
      output = CSV.generate do |csv|
        csv << columns
        top_results.each { |row| csv << columns.map { |c| row[c] } }
      end
      puts output
    end
  end
end

def articles_for_openai
  CaseStudy::Article.searchable.map do |article|
    text = article.title
    text += article.contents.by_position.map(&:to_text).join(" ")
    {
      id: article.id,
      text: text.tr("\n", " ").split.first(1500).join(" ")
    }
  end
end

def destroy_existing
  Review.destroy_all
  CaseStudy::Company.destroy_all
  CaseStudy::Article.destroy_all
  CaseStudy::Content.destroy_all
  CaseStudy::Section.destroy_all
  CaseStudy::Industry.destroy_all
  CaseStudy::Skill.destroy_all
end

def populate_all
  populate("companies")
  populate("articles", ignore_columns: ["interviewer_id"], map_columns: ["specialist_id"])
  populate("sections")
  populate("contents")
  populate("industries", map_columns: ["industry_id"])
  populate("skills", ignore_columns: ["search_id"], map_columns: ["skill_id"])
end

def populate(table, ignore_columns: [], map_columns: [])
  rows = CSV.read("lib/tasks/data/case_studies/case_study_#{table}.csv", headers: true)
  mapped_colums = {}
  map_columns.each do |column|
    mapped_colums[column] = column.sub(/_id$/, "").capitalize.constantize.pluck(:id)
  end
  sql = rows.map do |row|
    row = row.to_h.except("log_data", *ignore_columns)
    map_columns.each do |column|
      row[column] = mapped_colums[column][row[column].to_i % mapped_colums[column].length]
    end
    row.each do |key, value|
      next unless value.is_a?(String) && (/^{(.*)}$/.match?(value) || /^\[(.*)\]$/.match?(value))

      row[key] = JSON.parse(value)
    end
    row
  end
  model = "CaseStudy::#{table.singularize.capitalize}".constantize
  model.upsert_all(sql)
end
