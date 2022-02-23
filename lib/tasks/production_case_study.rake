# frozen_string_literal: true

require_relative "../../config/environment"

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

  task upload: :environment do
    client = OpenAI::Client.new
    articles = articles_for_openai
    tempfile = Tempfile.new("openai_articles.jsonl").tap do |file|
      file.write(articles.map { |a| a.slice(:text).to_json }.join("\n"))
    end
    upload = client.files.upload(parameters: {file: tempfile.path, purpose: "search"})
    puts "Uploaded #{articles.size} articles to OpenAI. File ID: #{upload["id"]}"
    puts "Mapping: #{articles.pluck(:id)}"
  end

  task search: :environment do
    client = OpenAI::Client.new
    file = "file-GnrMqdxviIWU7yw7Fd2A7PVt"
    mapping = [318, 142, 115, 46, 309, 210, 313, 363, 234, 311, 182, 68, 143, 2, 211, 397, 319, 360, 398, 87, 353, 213, 399, 352, 331, 111, 49, 1, 338, 339, 401, 312, 218, 308, 223, 149, 123, 219, 402, 230, 229, 203, 342, 343, 146, 119, 340, 315, 185, 362, 76, 344, 304, 148, 247, 235, 361, 105, 121, 206, 345, 225, 73, 91, 238, 188, 92, 117, 354, 302, 194, 356, 341, 212, 355, 357, 199, 244, 411, 147, 410, 358, 133, 301, 184, 259, 412, 74, 245, 359, 327, 201, 215, 45, 242, 113, 349, 414, 324, 202, 248, 332, 72, 197, 200, 195, 226, 131, 190, 77, 102, 103, 415, 81, 193, 96, 217, 112, 418, 108, 417, 82, 246, 207, 71, 136, 322, 321, 220, 351, 320, 303, 98, 122, 132, 323, 85, 232, 240, 214, 125, 80, 209, 106, 396, 306, 222, 88, 100, 128, 120, 64, 221, 95, 204, 127, 114, 145, 186, 118, 348, 144, 126, 295, 78, 116, 228, 90, 84, 187, 347, 99, 109, 326, 69, 330, 129, 191, 231, 328, 239, 224, 237, 294, 329, 227, 183, 346, 192, 208, 233, 293, 141, 196, 86, 189, 297, 135, 296, 97, 110, 89, 298, 307, 300, 65]
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
      search = client.search(engine: "text-curie-001", parameters: {file:, query:})
      sorted_data = search["data"].sort_by { |d| d["score"] }.reverse
      top_results = []
      sorted_data.take(5).each do |d|
        article = CaseStudy::Article.find(mapping[d["document"]])
        top_results << {
          uid: article.uid,
          score: d["score"],
          url: "https://app.advisable.com/case_studies/#{article.uid}"
        }
      end
      puts "-" * 100
      puts "Top 5 results for query with Curie engine: #{query}"
      columns = top_results.first.keys
      output = CSV.generate do |csv|
        csv << columns
        top_results.each { |row| csv << columns.map { |c| row[c] } }
      end
      puts output
      puts "-" * 100
    end
  end
end

def articles_for_openai
  CaseStudy::Article.searchable.map do |article|
    text = article.contents.by_position.where(type: "CaseStudy::ParagraphContent").map { |c| c.content["text"] }
    {
      id: article.id,
      text: text.join(" ").tr("\n", " ").split.first(1000).join(" ")
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
