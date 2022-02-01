# frozen_string_literal: true

require "ruby-progressbar"
require "csv"

# rubocop:disable Rails/SkipsModelValidations
class NewTestData
  AMOUNT_OF_RANDOM_IMAGES = 100
  AMOUNT_OF_CASE_STUDIES = 100
  YML_NAME = "test_data.yml"
  YML_PATH = "db/seeds/#{YML_NAME}".freeze
  IMAGES_PATH = "db/seeds/assets/images/"

  extend Memoist

  attr_reader :yml, :advisable_yml, :now, :sales_person, :country

  def self.yml_file
    unless File.exist?(YML_PATH)
      obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key: YML_NAME)
      obj.download_file(YML_PATH)
    end

    YAML.load_file(YML_PATH)
  end

  def self.upload_yml_file
    obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key: YML_NAME)
    obj.upload_file(YML_PATH)
  end

  # Populate skill categories by going to production and running:
  # SkillCategorySkill.joins(:skill).where(skill: {active: [nil, false]})
  # to verify all the skills are active. Delete others. Then:
  # puts ({skill_categories: SkillCategorySkill.includes(:skill, :skill_category).group_by{|scs| scs.skill_category.name}.map{|sc, scss| [sc, scss.map{|scs| scs.skill.name}]}.to_h}.to_yaml)
  # then replace in test_data.yml
  def self.seed_from_airtable!
    yml = yml_file

    Airtable::Skill.sync(filter: nil)
    attrs = %i[name category profile uid active airtable_id]
    yml[:skills] = Skill.active.pluck(*attrs).map { |p| attrs.zip(p).to_h }

    Airtable::Industry.sync(filter: nil)
    attrs = %i[name color active uid airtable_id]
    yml[:industries] = Industry.active.pluck(*attrs).map { |p| attrs.zip(p).to_h }

    File.write(YML_PATH, yml.to_yaml)
    upload_yml_file
  end

  def initialize(purge: false)
    purge_and_migrate! if purge

    @yml = self.class.yml_file
    @advisable_yml = YAML.load_file("db/seeds/people.yml")[:advisable]
    @unsplash_images = Dir.glob("#{IMAGES_PATH}*.jpg")
    @now = Time.zone.now
    @sales_person = SalesPerson.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, username: Faker::Internet.username)
    @country = Country.find_or_create_by(name: "Ireland")
  end

  def seed!
    download_images if missing_images_count.positive?
    populate_skills if Skill.none?
    populate_skill_categories if SkillCategory.none?
    populate_industries if Industry.none?
    populate_labels if Label.none?
    populate_companies if Company.count < 2
    populate_advisable if User.none?
    populate_case_studies if CaseStudy::Article.none?
    populate_reviews if Review.none?
    populate_events if Event.none?
    populate_posts if Guild::Post.none?
    populate_payment_requests if PaymentRequest.none?
    populate_payments_and_payouts if Payment.none?
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
      res = Faraday.new(url:) { |f| f.use(FaradayMiddleware::FollowRedirects) }.get

      raise "Couldn't download images from Unsplash" unless res.success?

      file_path = "#{IMAGES_PATH}/#{res.headers["x-imgix-id"]}.jpg"
      next if File.exist?(file_path)

      File.binwrite(file_path, res.body)
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
    @skill_ids = @skills.values
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
    @industries = Industry.insert_all(industries_data, returning: %w[id name]).pluck("name", "id").to_h
    @industry_ids = @industries.values
  end

  def populate_labels
    labels_data = []
    @skills.each do |name, id|
      labels_data << {name:, slug: name.parameterize, skill_id: id, industry_id: nil, country_id: nil, created_at: now, updated_at: now, published_at: now}
    end

    @industries.each do |name, id|
      labels_data << {name:, slug: name.parameterize, skill_id: nil, industry_id: id, country_id: nil, created_at: now, updated_at: now, published_at: now}
    end

    Country.pluck(:name, :id) do |name, id|
      labels_data << {name:, slug: name.parameterize, skill_id: nil, industry_id: nil, country_id: id, created_at: now, updated_at: now, published_at: now}
    end

    Label.insert_all(labels_data)
  end

  def populate_advisable
    @accounts = Account.upsert_all(advisable_data.pluck(:account), unique_by: :email).pluck("id")
    @accounts.each_with_index do |account, i|
      key = i.even? ? :specialist : :user
      advisable_data[i][key][:account_id] = account
    end
    specialist_data = advisable_data.pluck(:specialist).compact
    user_data = advisable_data.pluck(:user).compact
    @specialist_ids = Specialist.upsert_all(specialist_data, unique_by: :account_id).pluck("id")
    @users = User.upsert_all(user_data, unique_by: :account_id).pluck("id")

    Specialist.where(id: specialist_ids).each_with_index do |specialist, i|
      path = "db/seeds/assets/avatars/#{advisable_yml[i][:avatar]}"
      specialist.account.avatar.attach(io: File.open(path), filename: advisable_yml[i][:avatar])
    end

    User.where(id: @users).each_with_index do |user, i|
      path = "db/seeds/assets/avatars/#{advisable_yml[i][:avatar]}"
      user.account.avatar.attach(io: File.open(path), filename: advisable_yml[i][:avatar])
    end

    project_data = []
    @users.each_with_index do |user, i|
      possesive = advisable_yml[i][:first_name]
      possesive = possesive.end_with?("s") ? "#{possesive}'" : "#{possesive}'s"
      project_data << {name: "#{possesive} Project", user_id: user, uid: Project.generate_uid, created_at: now, updated_at: now, hired_count: 1, sales_status: "Won"}
    end
    @projects = Project.insert_all(project_data).pluck("id")

    application_data = []
    @projects.each_with_index do |project, i|
      application_data << {project_id: project, project_type: "Fixed", specialist_id: specialist_ids[i], status: "Working", uid: Application.generate_uid, created_at: now, updated_at: now, started_working_at: now - 1.week}
    end
    @applications = Application.insert_all(application_data).pluck("id")

    project_skills_data = []
    @projects.each do |project|
      project_skills_data << {project_id: project, project_type: "Project", skill_id: skill_ids.sample, primary: true, created_at: now, updated_at: now}
      skill_ids.sample(rand(1..5)).each do |skill_id|
        project_skills_data << {project_id: project, project_type: "Project", skill_id:, primary: false, created_at: now, updated_at: now}
      end
    end
    @project_skills = ProjectSkill.insert_all(project_skills_data).pluck("id")
  end

  def populate_reviews
    reviews_data = []
    rating_keys = %w[skills availability communication quality_of_work adherence_to_schedule]
    specialist_ids.each do |specialist_id|
      3.times do
        ratings = rating_keys.index_with { rand(1..5) }
        case_study_article_id = [nil, @articles.sample].sample
        reviews_data << {uid: Review.generate_uid, specialist_id:, case_study_article_id:, ratings:, comment: Faker::Hipster.paragraph, created_at: now, updated_at: now}
      end
    end
    @reviews = Review.insert_all(reviews_data).pluck("id")
  end

  def populate_events
    events_data = []
    10.times do
      starts_at = rand(1..10).days.from_now
      events_data << {uid: Event.generate_uid, host_id: specialist_ids.sample, title: Faker::Hipster.sentence, description: Faker::Hipster.paragraph, color: Event::COLORS.sample, starts_at:, ends_at: starts_at + 1.hour, featured: rand(1..4) == 1, published_at: now, created_at: now, updated_at: now}
    end
    @events = Event.insert_all(events_data).pluck("id")
  end

  def populate_posts
    posts_data = []
    10.times do
      posts_data << {title: Faker::Hipster.sentence, specialist_id: specialist_ids.sample, body: Faker::Hipster.paragraph, audience_type: Guild::Post::AUDIENCE_TYPES.sample, status: 1, created_at: now, updated_at: now}
    end
    @posts = Guild::Post.insert_all(posts_data).pluck("id")
  end

  def populate_companies
    companies_data = []
    10.times do
      companies_data << {name: Faker::Company.name, business_type: Company::BUSINESS_TYPES.sample, sales_person_id: sales_person.id, created_at: now, updated_at: now}
    end
    @company_ids = Company.insert_all(companies_data).pluck("id")
  end

  def populate_payment_requests
    payment_requests_data = []
    company_ids.each do |company_id|
      3.times do
        status = PaymentRequest::VALID_STATUSES.sample
        dispute_reason = status == "disputed" ? Faker::Hipster.sentence : nil
        line_items = []
        rand(1..5).times do
          line_items << {description: Faker::Commerce.product_name, amount: rand(1..10) * 100}
        end
        payment_requests_data << {uid: PaymentRequest.generate_uid, company_id: company_id, specialist_id: specialist_ids.sample, status: status, dispute_reason: dispute_reason, line_items: line_items, created_at: now, updated_at: now}
      end
    end
    @payment_requests = PaymentRequest.insert_all(payment_requests_data).pluck("id")
  end

  def populate_payments_and_payouts
    approved_payment_requests = PaymentRequest.where(status: %w[approved paid]).pluck(:id, :line_items, :company_id, :specialist_id)
    payments_data = []
    payouts_data = []
    approved_payment_requests.each do |id, line_items, company_id, specialist_id|
      amount = line_items.sum { |li| li["amount"] }
      payments_data << {uid: Payment.generate_uid, payment_request_id: id, company_id: company_id, specialist_id: specialist_id, amount: amount, admin_fee: (amount * 0.05).round, status: Payment::VALID_STATUSES.sample, created_at: now, updated_at: now}
      payouts_data << {uid: Payout.generate_uid, payment_request_id: id, specialist_id: specialist_id, amount: amount, sourcing_fee: (amount * 0.08).round, status: Payout::VALID_STATUSES.sample, created_at: now, updated_at: now}
    end
    @payments = Payment.insert_all(payments_data).pluck("id")
    @payouts = Payout.insert_all(payouts_data).pluck("id")
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
    @cs_company_ids = CaseStudy::Company.upsert_all(companies).pluck("id")
  end

  def populate_cs_articles
    articles = []
    AMOUNT_OF_CASE_STUDIES.times do |i|
      articles << {
        title: Faker::Hipster.sentence(word_count: 6, random_words_to_add: 4),
        subtitle: Faker::Hipster.sentence,
        comment: Faker::Hipster.sentence,
        confidential: [true, false].sample,
        company_type: ["Major Corporation", "Growth-Stage Startup", "Medium-Sized Business", "Startup", "Non-Profit", "Small Business", "Government", "Education Institution", "Individual Entrepreneur", "Governement"].sample(rand(1..3)),
        goals: ["Rebranding", "Improve Retention", "Generate Leads", "Increase Brand Awareness", "Improve Conversion", "Increase Web Traffic", "Improve Profitability", "Improve Processes", "Analyse Existing Activities", "Improve Efficiency", "Develop Strategy", "Increase Brand Awarenes", "Improve Process"].sample(rand(1..3)),
        score: rand(100),
        company_id: @cs_company_ids[i],
        specialist_id: specialist_ids.sample,
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
    main_sections = [{type: "background", position: 0}, {type: "overview", position: 1}, {type: "outcome", position: 2}]
    @articles.each do |article|
      skills += skill_ids.sample(rand(3..5)).map.with_index { |s, i| {skill_id: s, uid: CaseStudy::Skill.generate_uid, created_at: now, updated_at: now, primary: i.zero?, article_id: article} }
      industries += industry_ids.sample(rand(3..5)).map { |i| {industry_id: i, uid: CaseStudy::Industry.generate_uid, created_at: now, updated_at: now, article_id: article} }
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
        contents << content_hash("CaseStudy::ResultsContent", {results:}, section)
        contents << content_hash("CaseStudy::ParagraphContent", {text: Faker::Hipster.paragraph(sentence_count: 12, random_sentences_to_add: 8)}, section)
        contents << content_hash("CaseStudy::ImagesContent", nil, section) if rand(1..3).even? # 1/3 chance
        @content_position = 0
      end
    end
    CaseStudy::Content.upsert_all(contents)
  end

  def content_hash(type, content, section_id)
    @content_position += 1
    {type:, content:, position: @content_position, created_at: now, updated_at: now, section_id:, uid: CaseStudy::Content.generate_uid}
  end

  def attach_images_to_cs_contents
    CaseStudy::ImagesContent.find_each do |content|
      @unsplash_images.sample(rand(1..5)).each do |image|
        content.images.attach(io: File.open(image), filename: image.split("/").last)
      end
    end
  end

  def skill_ids
    @skill_ids ||= Skill.pluck(:id)
  end

  def industry_ids
    @industry_ids ||= Industry.pluck(:id)
  end

  def specialist_ids
    @specialist_ids ||= Specialist.pluck(:id)
  end

  def company_ids
    @company_ids ||= Company.pluck(:id)
  end

  memoize def advisable_data
    advisable_yml.flat_map do |advisable|
      [
        {
          account: {
            uid: Account.generate_uid,
            email: advisable[:email].sub("@", "+specialist@"),
            first_name: advisable[:first_name],
            last_name: "#{advisable[:last_name]} Specialist",
            password_digest: "$2a$12$4COpROFiSO8HSEzpDRbwjOvjklTclASMbHz5L8FdUsmo1e/nQFCWm", # testing123
            permissions: [],
            features: [],
            confirmed_at: 1.hour.ago,
            completed_tutorials: %w[fixed_projects flexible_projects guild],
            updated_at: now,
            created_at: now
          },
          specialist: {
            uid: Specialist.generate_uid,
            bio: advisable[:bio],
            application_stage: "Accepted",
            country_id: country.id,
            city: "Scranton",
            bank_holder_name: "Advisable",
            bank_holder_address: "Advisable street",
            bank_currency: "EUR",
            guild: true,
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
            features: [],
            confirmed_at: 1.hour.ago,
            completed_tutorials: %w[fixed_projects flexible_projects recommendations],
            updated_at: now,
            created_at: now
          },
          user: {
            uid: User.generate_uid,
            company_id: company_ids.sample,
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
