# frozen_string_literal: true

class DataFromProduction
  TABLE_NAMES = %i[
    case_study_articles
    case_study_companies
    case_study_contents
    case_study_industries
    case_study_sections
    case_study_skills
    case_study_embeddings
    industries
    skills
    skill_categories
    skill_category_skills
  ].freeze

  attr_reader :file

  def create_file!
    download_data_from_production
    destroy_local_data
    populate_local_tables
    prepare_file
    upload_file
  end

  private

  def prepare_file
    puts "Preparing file…"
  end

  def upload_file
    puts "Uploading to S3…"
    obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key: TestData::YML_NAME)
    obj.upload_file(TestData::YML_PATH)
  end

  def download_data_from_production
    puts "Downloading from production…"
    FileUtils.mkdir_p(TestData::DATA_DIR)
    TABLE_NAMES.each do |table|
      next if File.exist?("#{TestData::DATA_DIR}/#{table}.csv")

      `heroku pg:psql -c "\\copy (SELECT * FROM #{table}) TO #{TestData::DATA_DIR}/#{table}.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)"`
    end
  end

  def destroy_local_data
    puts "Destroying existing local data…"
    Review.delete_all
    Label.delete_all
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
    Industry.delete_all
  end

  def populate_local_tables
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

  def populate(table, ignore_columns: [], map_columns: [], prefix: "case_study_")
    puts "Populating #{table}…"
    rows = CSV.read("#{TestData::DATA_DIR}/#{prefix}#{table}.csv", headers: true)
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
    model.upsert_all(sql) # rubocop:disable Rails/SkipsModelValidations
  end
end
