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
    row
  end
  model = "CaseStudy::#{table.singularize.capitalize}".constantize
  model.upsert_all(sql) # rubocop:disable Rails/SkipsModelValidations
end
