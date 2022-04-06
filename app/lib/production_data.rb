# frozen_string_literal: true

require "zip"
require "csv"

# rubocop:disable Rails/SkipsModelValidations
class ProductionData
  CLASSES = [
    CaseStudy::Industry, CaseStudy::Skill, CaseStudy::Content, CaseStudy::Section, CaseStudy::Embedding,
    CaseStudy::Article, CaseStudy::Company, SkillCategorySkill, SkillCategory, Skill, Industry
  ].freeze
  TABLE_NAMES = CLASSES.map(&:table_name).freeze

  attr_reader :source_dir

  def create_file!
    destroy_local_data
    PeopleData.new.seed!
    download_data_from_production
    populate_local_tables
    prune_data
    prepare_file
    upload_file
  end

  def populate_local_tables(source_dir: TestData::DATA_DIR)
    @source_dir = source_dir

    PeopleData::TABLE_NAMES.reverse_each { |table| populate(table, prefix: "") } if Account.none?
    populate("companies")
    populate("articles", ignore_columns: ["interviewer_id"], map_columns: ["specialist_id"])
    populate("embeddings")
    populate("sections")
    populate("contents")
    populate("industries", prefix: "")
    populate("industries")
    populate("skills", prefix: "")
    populate("skill_categories", prefix: "")
    populate("skill_category_skills", prefix: "")
    populate("skills", ignore_columns: ["search_id"])
  end

  private

  def download_data_from_production
    puts "Downloading from production…"
    FileUtils.mkdir_p(TestData::DATA_DIR)
    TABLE_NAMES.
      reject { |table| File.exist?("#{TestData::DATA_DIR}/#{table}.csv") }.
      each { |table| `heroku pg:psql -c "\\copy (SELECT * FROM #{table}) TO #{TestData::DATA_DIR}/#{table}.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)"` }
  end

  def destroy_local_data
    puts "Destroying existing local data…"
    Review.delete_all
    Label.delete_all
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

  def populate(table, ignore_columns: [], map_columns: [], prefix: "case_study_")
    puts "Populating #{table}…"
    rows = CSV.read("#{source_dir}/#{prefix}#{table}.csv", headers: true)
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
end
# rubocop:enable Rails/SkipsModelValidations
