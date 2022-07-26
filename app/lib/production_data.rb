# frozen_string_literal: true

require "zip"
require "csv"

# rubocop:disable Rails/SkipsModelValidations
class ProductionData
  CLASSES = [
    CaseStudy::Industry, CaseStudy::Skill, CaseStudy::Insight, CaseStudy::Content, CaseStudy::Section, CaseStudy::Embedding,
    CaseStudy::Article, CaseStudy::Company, SkillCategorySkill, SkillCategory, Skill, Industry
  ].freeze
  TABLE_NAMES = CLASSES.map(&:table_name).freeze

  def create_file!
    raise "Ensure insights and new results data is in production before removing"

    destroy_local_data
    PeopleData.new.seed!
    download_data_from_production
    populate_local_tables
    prune_data
    LocalData.new.populate_interests!
    prepare_file
    upload_file
  end

  def populate_local_tables(source_dir: TestData::DATA_DIR)
    PeopleData::TABLE_NAMES.reverse_each { |table| populate(table, source_dir:) } if Account.none?
    populate("case_study_companies", source_dir:)
    populate("case_study_articles", ignore_columns: ["interviewer_id"], map_columns: ["specialist_id"], source_dir:)
    populate("case_study_embeddings", source_dir:)
    populate("case_study_sections", source_dir:)
    populate("case_study_contents", source_dir:)
    populate("case_study_insights", source_dir:)
    populate("industries", source_dir:)
    populate("case_study_industries", source_dir:)
    populate("skills", source_dir:)
    populate("skill_categories", source_dir:)
    populate("skill_category_skills", source_dir:)
    populate("case_study_skills", ignore_columns: ["search_id"], source_dir:)
  end

  def copy_table_from_production(table_name, ignore_columns: [], map_columns: [])
    source_dir = "tmp/data/#{Time.zone.today.strftime("%Y-%m-%d")}"
    FileUtils.mkdir_p(source_dir)
    download_table(table_name, source_dir)
    populate(table_name, ignore_columns:, map_columns:, source_dir:)
  end

  private

  def download_data_from_production
    puts "Downloading from production…"
    FileUtils.mkdir_p(TestData::DATA_DIR)
    TABLE_NAMES.each { |table| download_table(table, TestData::DATA_DIR) }
  end

  def download_table(table, source_dir)
    return if File.exist?("#{source_dir}/#{table}.csv")

    `heroku pg:psql -c "\\copy (SELECT * FROM #{table}) TO #{source_dir}/#{table}.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)"`
  end

  def destroy_local_data
    puts "Destroying existing local data…"
    Review.delete_all
    Label.delete_all
    LocalData.new.destroy_existing_data!
    CLASSES.each(&:delete_all)
  end

  def prune_data
    puts "Pruning data…"
    CaseStudy::Article.where.not(id: CaseStudy::Article.searchable.by_score.limit(100).select(:id)).destroy_all
    CaseStudy::Company.where.not(id: CaseStudy::Article.select(:company_id)).destroy_all

    inactive_skills = Skill.where(active: [nil, false])
    CaseStudy::Skill.where(skill: inactive_skills).delete_all
    inactive_skills.delete_all

    inactive_industries = Industry.where(active: [nil, false])
    CaseStudy::Industry.where(industry: inactive_industries).delete_all
    inactive_industries.delete_all
  end

  def prepare_file
    puts "Preparing file…"

    FileUtils.remove_file(TestData::ZIP_PATH) if File.exist?(TestData::ZIP_PATH)
    FileUtils.mkdir_p(TestData::PRUNED_DIR)
    TABLE_NAMES.each { |table| `psql -d advisable_development -c "\\copy (SELECT * FROM #{table}) TO #{TestData::PRUNED_DIR}/#{table}.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)"` }

    ::Zip::File.open(TestData::ZIP_PATH, create: true) do |zipfile|
      Dir.entries(TestData::PRUNED_DIR.to_s).select { |f| f.end_with?(".csv") }.each do |filename|
        zipfile.add(filename, "#{TestData::PRUNED_DIR}/#{filename}")
      end
    end
  end

  def upload_file
    puts "Uploading to S3…"
    obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key: TestData::ZIP_NAME)
    obj.upload_file(TestData::ZIP_PATH)
  end

  def populate(table, ignore_columns: [], map_columns: [], source_dir: TestData::DATA_DIR)
    puts "Populating #{table}…"
    klass = all_the_tables[table]
    rows = CSV.read("#{source_dir}/#{table}.csv", headers: true)
    if map_columns.any?
      mapped_colums = {}
      reflections = klass.reflect_on_all_associations(:belongs_to)
      map_columns.each do |column|
        reflection = reflections.find { |a| a.foreign_key == column }
        mapped_colums[column] = reflection.klass.pluck(:id)
      end
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
    klass.upsert_all(sql)
  end

  def all_the_tables
    @all_the_tables ||= begin
      Zeitwerk::Loader.eager_load_all
      all_models = ObjectSpace.each_object(Class).select { |c| c < ApplicationRecord }.select(&:name)
      all_models.index_by(&:table_name)
    end
  end
end
# rubocop:enable Rails/SkipsModelValidations
