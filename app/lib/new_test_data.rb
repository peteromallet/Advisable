# frozen_string_literal: true

require "ruby-progressbar"
require "csv"

# rubocop:disable Rails/SkipsModelValidations
class NewTestData
  AMOUNT_OF_RANDOM_IMAGES = 100
  AMOUNT_OF_CASE_STUDIES = 100
  IMAGES_PATH = "db/seeds/assets/images/"

  extend Memoist

  attr_reader :yml, :now, :sales_person, :country, :company

  def self.seed_from_airtable!
    yml = YAML.load_file("db/seeds/test_data.yml")

    Airtable::Skill.sync(filter: nil)
    attrs = %i[name category profile uid active airtable_id]
    yml[:skills] = Skill.pluck(*attrs).map { |p| attrs.zip(p).to_h }

    Airtable::Industry.sync(filter: nil)
    attrs = %i[name color active uid airtable_id]
    yml[:industries] = Industry.pluck(*attrs).map { |p| attrs.zip(p).to_h }

    File.write("db/seeds/test_data.yml", yml.to_yaml)
  end

  def self.seed_skill_categories_from_csv!
    csv = CSV.read("db/seeds/skill_categories.csv", headers: true)

    categories = {}
    csv.each do |row|
      categories[row["Skill Group"]] ||= []
      categories[row["Skill Group"]] << row["Skill"]
    end

    yml = YAML.load_file("db/seeds/test_data.yml")
    yml[:skill_categories] = categories
    File.write("db/seeds/test_data.yml", yml.to_yaml)
  end

  def initialize
    purge_and_migrate!

    @yml = YAML.load_file("db/seeds/test_data.yml")
    @unsplash_images = Dir.glob("#{IMAGES_PATH}*.jpg")
    @now = Time.zone.now
    @sales_person = SalesPerson.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, username: Faker::Internet.username)
    @country = Country.find_or_create_by(name: "Ireland")
    @company = Company.find_or_create_by(name: "Advisable", sales_person: sales_person)
  end

  def seed!
    download_images if missing_images_count.positive?
    populate_skills
    populate_skill_categories
    populate_industries
    populate_advisable
    populate_case_studies
  end

  private

  def purge_and_migrate!
    ActiveRecord::Tasks::DatabaseTasks.purge_current
    ActiveRecord::Tasks::DatabaseTasks.migrate
  end

  def download_images
    FileUtils.mkdir_p(IMAGES_PATH)
    progressbar = ProgressBar.create(format: "Downloading images: %a %b\u{15E7}%i %p%% %e", progress_mark: " ", remainder_mark: "\u{FF65}", total: missing_images_count)
    while missing_images_count.positive?
      url = "https://source.unsplash.com/featured/"
      res = Faraday.new(url: url) { |f| f.use(FaradayMiddleware::FollowRedirects) }.get

      raise "Couldn't download images from Unsplash" unless res.success?

      file_path = "#{IMAGES_PATH}/#{res.headers["x-imgix-id"]}.jpg"
      next if File.exist?(file_path)

      File.open(file_path, "wb") { |f| f.write(res.body) }
      progressbar.increment
    end
    @unsplash_images = Dir.glob("#{IMAGES_PATH}*.jpg")
  end

  def missing_images_count
    AMOUNT_OF_RANDOM_IMAGES - Dir.glob("#{IMAGES_PATH}*.jpg").count
  end

  def populate_skills
    skills_data = yml[:skills].map do |skill|
      skill.merge(created_at: now, updated_at: now)
    end
    @skills = Skill.insert_all(skills_data, returning: %w[id name]).pluck("name", "id").to_h
  end

  def populate_skill_categories
    categories_data = yml[:skill_categories].map do |category, _skills|
      {name: category, slug: category.parameterize, created_at: now, updated_at: now}
    end
    categories = SkillCategory.upsert_all(categories_data, returning: %w[id name], unique_by: :slug).pluck("name", "id").to_h

    skill_category_skills_data = yml[:skill_categories].flat_map do |category, skills|
      skills.map do |skill|
        {skill_id: @skills[skill], skill_category_id: categories[category], created_at: now, updated_at: now}
      end
    end

    SkillCategorySkill.insert_all(skill_category_skills_data)
  end

  def populate_industries
    industries_data = yml[:industries].map do |industry|
      industry.merge(created_at: now, updated_at: now)
    end
    @industries = Industry.insert_all(industries_data).pluck("id")
  end

  def populate_advisable
    @accounts = Account.upsert_all(advisable_data.pluck(:account), unique_by: :email).pluck("id")
    @accounts.each_with_index do |account, i|
      key = i.even? ? :specialist : :user
      advisable_data[i][key][:account_id] = account
    end
    specialist_data = advisable_data.pluck(:specialist).compact
    user_data = advisable_data.pluck(:user).compact
    @specialists = Specialist.upsert_all(specialist_data, unique_by: :account_id).pluck("id")
    @users = User.upsert_all(user_data, unique_by: :account_id).pluck("id")

    Specialist.where(id: @specialists).each_with_index do |specialist, i|
      path = "db/seeds/assets/avatars/#{yml[:advisable][i][:avatar]}"
      specialist.avatar.attach(io: File.open(path), filename: yml[:advisable][i][:avatar])
    end

    User.where(id: @users).each_with_index do |user, i|
      path = "db/seeds/assets/avatars/#{yml[:advisable][i][:avatar]}"
      user.avatar.attach(io: File.open(path), filename: yml[:advisable][i][:avatar])
    end
  end

  def populate_case_studies
    populate_cs_companies
    populate_cs_articles
    populate_cs_article_stuff
    populate_cs_contents
    attach_images_to_cs_contents
  end

  def populate_cs_companies
    companies = []
    AMOUNT_OF_CASE_STUDIES.times do
      companies << {
        name: Faker::Company.name,
        business_type: "B2B",
        website: Faker::Internet.url,
        uid: CaseStudy::Company.generate_uid,
        created_at: now,
        updated_at: now
      }
    end
    @companies = CaseStudy::Company.upsert_all(companies).pluck("id")
  end

  def populate_cs_articles
    articles = []
    AMOUNT_OF_CASE_STUDIES.times do |i|
      articles << {
        title: Faker::Hipster.sentence(word_count: 12, random_words_to_add: 4),
        subtitle: Faker::Hipster.sentence,
        comment: Faker::Hipster.sentence,
        confidential: [true, false].sample,
        company_type: ["Major Corporation", "Growth-Stage Startup", "Medium-Sized Business", "Startup", "Non-Profit", "Small Business", "Government", "Education Institution", "Individual Entrepreneur", "Governement"].sample(rand(1..3)),
        goals: ["Rebranding", "Improve Retention", "Generate Leads", "Increase Brand Awareness", "Improve Conversion", "Increase Web Traffic", "Improve Profitability", "Improve Processes", "Analyse Existing Activities", "Improve Efficiency", "Develop Strategy", "Increase Brand Awarenes", "Improve Process"].sample(rand(1..3)),
        score: rand(100),
        company_id: @companies[i],
        specialist_id: @specialists.sample,
        uid: CaseStudy::Article.generate_uid,
        published_at: now,
        created_at: now,
        updated_at: now
      }
    end
    @articles = CaseStudy::Article.upsert_all(articles).pluck("id")
  end

  def populate_cs_article_stuff
    skills = industries = sections = []
    skill_ids = @skills.values
    main_sections = [{type: "background", position: 0}, {type: "overview", position: 1}, {type: "outcome", position: 2}]
    @articles.each do |article|
      skills += skill_ids.sample(rand(3..5)).map.with_index { |s, i| {skill_id: s, uid: CaseStudy::Skill.generate_uid, created_at: now, updated_at: now, primary: i.zero?, article_id: article} }
      industries += @industries.sample(rand(3..5)).map { |i| {industry_id: i, uid: CaseStudy::Industry.generate_uid, created_at: now, updated_at: now, article_id: article} }
      sections += main_sections.map { |s| s.merge(uid: CaseStudy::Section.generate_uid, created_at: now, updated_at: now, article_id: article) }
    end
    CaseStudy::Skill.upsert_all(skills)
    CaseStudy::Industry.upsert_all(industries)
    @sections = CaseStudy::Section.upsert_all(sections, returning: %w[id type]).pluck("id", "type")
  end

  def populate_cs_contents
    contents = []
    @content_position = 0
    @sections.each do |section, type|
      case type
      when "background"
        contents << content_hash("CaseStudy::HeadingContent", {size: "h1", text: Faker::Marketing.buzzwords.titleize}, section)
        contents << content_hash("CaseStudy::ParagraphContent", {text: Faker::Hipster.paragraph(sentence_count: 12, random_sentences_to_add: 8)}, section)
        contents << content_hash("CaseStudy::ImagesContent", nil, section) if rand(1..3).even? # 1/3 chance
      when "overview"
        contents << content_hash("CaseStudy::HeadingContent", {size: "h1", text: Faker::Marketing.buzzwords.titleize}, section)
        7.times do
          contents << content_hash("CaseStudy::HeadingContent", {size: "h2", text: Faker::Marketing.buzzwords.titleize}, section)
          contents << content_hash("CaseStudy::ParagraphContent", {text: Faker::Hipster.paragraph(sentence_count: 12, random_sentences_to_add: 8)}, section)
          contents << content_hash("CaseStudy::ImagesContent", nil, section) if rand(1..3).even? # 1/3 chance
        end
      when "outcome"
        results = []
        rand(2..5).times { results << Faker::Marketing.buzzwords }
        contents << content_hash("CaseStudy::HeadingContent", {size: "h1", text: Faker::Marketing.buzzwords.titleize}, section)
        contents << content_hash("CaseStudy::ResultsContent", {results: results}, section)
        contents << content_hash("CaseStudy::ParagraphContent", {text: Faker::Hipster.paragraph(sentence_count: 12, random_sentences_to_add: 8)}, section)
        contents << content_hash("CaseStudy::ImagesContent", nil, section) if rand(1..3).even? # 1/3 chance
        @content_position = 0
      end
    end
    CaseStudy::Content.upsert_all(contents)
  end

  def content_hash(type, content, section_id)
    @content_position += 1
    {type: type, content: content, position: @content_position, created_at: now, updated_at: now, section_id: section_id, uid: CaseStudy::Content.generate_uid}
  end

  def attach_images_to_cs_contents
    CaseStudy::ImagesContent.find_each do |content|
      @unsplash_images.sample(rand(1..5)).each do |image|
        content.images.attach(io: File.open(image), filename: image.split("/").last)
      end
    end
  end

  memoize def advisable_data
    yml[:advisable].flat_map do |advisable|
      [
        {
          account: {
            uid: Account.generate_uid,
            email: advisable[:email].sub("@", "+specialist@"),
            first_name: advisable[:first_name],
            last_name: "#{advisable[:last_name]} Specialist",
            password_digest: "$2a$12$4COpROFiSO8HSEzpDRbwjOvjklTclASMbHz5L8FdUsmo1e/nQFCWm", # testing123
            permissions: [],
            features: {},
            confirmed_at: 1.hour.ago,
            updated_at: now,
            created_at: now
          },
          specialist: {
            uid: Specialist.generate_uid,
            bio: advisable[:bio],
            application_stage: "Accepted",
            country_id: country.id,
            city: "Scranton",
            updated_at: now,
            created_at: now
          }
        },
        {
          account: {
            uid: Account.generate_uid,
            email: advisable[:email],
            first_name: advisable[:first_name],
            last_name: advisable[:last_name],
            password_digest: "$2a$12$4COpROFiSO8HSEzpDRbwjOvjklTclASMbHz5L8FdUsmo1e/nQFCWm", # testing123
            permissions: %w[admin team_manager editor],
            features: {case_studies: true},
            confirmed_at: 1.hour.ago,
            updated_at: now,
            created_at: now
          },
          user: {
            uid: User.generate_uid,
            company_id: company.id,
            country_id: country.id,
            contact_status: "Application Accepted",
            updated_at: now,
            created_at: now
          }
        }
      ]
    end
  end
end
# rubocop:enable Rails/SkipsModelValidations
