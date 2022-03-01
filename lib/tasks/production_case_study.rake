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
# \copy (SELECT * FROM skills) TO skills.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)
# \copy (SELECT * FROM skill_categories) TO skill_categories.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)
# \copy (SELECT * FROM skill_category_skills) TO skill_category_skills.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)

namespace :production_case_study do
  task seed: :environment do
    destroy_existing
    populate_all
    populate_embeddings
  end

  task get_embeddings: :environment do
    engine = "babbage"
    articles = articles_for_openai
    articles.in_groups_of(20, false).each do |group|
      embeddings = client.embeddings(engine: "text-search-#{engine}-doc-001", parameters: {input: group.pluck(:text)})
      group.each.with_index do |article, index|
        article[:embedding] = embeddings["data"][index]["embedding"]
      end
    end
    File.write("lib/tasks/data/case_studies/embeddings-#{engine}.yml", articles.to_yaml)
  end

  task search_embeddings: :environment do
    engine = "babbage"
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
    queries.take(2).each do |q|
      query = client.embeddings(engine: "text-search-#{engine}-query-001", parameters: {input: q})
      data = query["data"].first["embedding"]
      query_vector = Vector.elements(data)
      results = []
      CaseStudy::Embedding.where(engine:).each do |embedding|
        results << {
          similarity: embedding.cosine_similarity_to(query_vector),
          title: embedding.article.title,
          embedding_id: embedding.id
        }
      end
      sorted = results.sort_by { |r| r[:similarity] }.reverse.take(3)
      puts "-" * 100
      puts "Top 3 results for query with #{engine} embeddings engine: #{q}"
      columns = sorted.first.keys
      output = CSV.generate do |csv|
        csv << columns
        sorted.each { |row| csv << columns.map { |c| row[c] } }
      end
      puts output
    end
  end

  task upload: :environment do
    articles = articles_for_openai
    tempfile = Tempfile.new("openai_articles.jsonl").tap do |file|
      file.write(articles.map { |a| {text: a[:text], metadata: a[:id]}.to_json }.join("\n"))
    end
    upload = client.files.upload(parameters: {file: tempfile.path, purpose: "search"})
    puts "Uploaded #{articles.size} articles to OpenAI. File ID: #{upload["id"]}"
  end

  task search: :environment do
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

def client
  @client ||= OpenAI::Client.new
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
  puts "Destroying existing data"
  Review.delete_all
  Label.delete_all
  ProjectSkill.delete_all
  CaseStudy::Industry.delete_all
  CaseStudy::Skill.delete_all
  CaseStudy::Content.delete_all
  CaseStudy::Section.delete_all
  CaseStudy::Embedding.delete_all
  CaseStudy::Article.delete_all
  CaseStudy::Company.delete_all
  SkillCategorySkill.delete_all
  SkillCategory.delete_all
  Skill.delete_all
end

def populate_all
  puts "Populating case studies"
  populate("companies")
  populate("articles", ignore_columns: ["interviewer_id"], map_columns: ["specialist_id"])
  populate("sections")
  populate("contents")
  populate("industries", map_columns: ["industry_id"])
  populate("skills", prefix: "")
  populate("skill_categories", prefix: "")
  populate("skill_category_skills", prefix: "")
  populate("skills", ignore_columns: ["search_id"])
end

def populate(table, ignore_columns: [], map_columns: [], prefix: "case_study_")
  rows = CSV.read("lib/tasks/data/case_studies/#{prefix}#{table}.csv", headers: true)
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

      begin
        row[key] = JSON.parse(value)
      rescue JSON::ParserError
        next
      end
    end
    row
  end
  model_prefix = "#{prefix.camelize}::" if prefix.present?
  model = "#{model_prefix}#{table.singularize.camelize}".constantize
  model.upsert_all(sql)
end

def populate_embeddings
  articles = articles_for_openai
  CaseStudy::Embedding::ENGINES.each do |engine|
    puts "Populating #{engine} embeddings"
    yml = YAML.load_file("lib/tasks/data/case_studies/embeddings-#{engine}.yml")
    yml.each do |data|
      article = articles.find { |a| a[:text] == data[:text] }
      CaseStudy::Embedding.create!(article_id: article[:id], data: data[:embedding], engine:)
    end
  end
end
