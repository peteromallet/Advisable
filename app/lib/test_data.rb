# frozen_string_literal: true

require "ruby-progressbar"
require "csv"
require "zip"

# rubocop:disable Rails/SkipsModelValidations
class TestData
  DATA_DIR = "db/seeds/data"
  PRUNED_DIR = "#{DATA_DIR}/pruned".freeze
  ZIP_NAME = "test_data_2022_04.zip"
  ZIP_PATH = "#{DATA_DIR}/#{ZIP_NAME}".freeze
  IMAGES_PATH = "db/seeds/assets/images/"
  AMOUNT_OF_RANDOM_IMAGES = 100

  extend Memoist

  attr_reader :advisable_yml, :now, :sales_person, :country

  def initialize(purge: false)
    purge_and_migrate! if purge

    @advisable_yml = YAML.load_file("db/seeds/people.yml")[:advisable]
    @unsplash_images = Dir.glob("#{IMAGES_PATH}*.jpg")
    @now = Time.zone.now
    @sales_person = SalesPerson.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, username: Faker::Internet.username)
    @country = Country.find_or_create_by(name: "Ireland")
  end

  def seed_people!
    populate_companies if Company.count < 2
    populate_advisable if Specialist.none?
  end

  def seed!
    seed_people!
    ensure_csv_files_exist!
    populate_pruned_data if CaseStudy::Article.none?

    [Label, Review, Event, Guild::Post, Agreement, PaymentRequest, Payment].each do |model|
      next unless model.none?

      puts "Populating #{model.table_name}…"
      __send__("populate_#{model.table_name}")
    end
  end

  private

  def purge_and_migrate!
    ActiveRecord::Tasks::DatabaseTasks.purge_current
    ActiveRecord::Tasks::DatabaseTasks.migrate
  end

  def ensure_csv_files_exist!
    unless File.exist?(ZIP_PATH)
      obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key: ZIP_NAME)
      obj.download_file(ZIP_PATH)
    end

    FileUtils.remove_dir(PRUNED_DIR) if File.exist?(PRUNED_DIR)
    FileUtils.mkdir(PRUNED_DIR)
    Zip::File.open(ZIP_PATH) do |zip_file|
      zip_file.each { |entry| entry.extract("#{PRUNED_DIR}/#{entry.name}") }
    end
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

  def populate_pruned_data
    DataFromProduction.new.populate_local_tables(source_dir: PRUNED_DIR)
    attach_images_to_cs_contents
  end

  def populate_labels
    labels_data = []
    Skill.pluck(:id, :name).each do |id, name|
      labels_data << {name:, slug: name.parameterize, skill_id: id, industry_id: nil, country_id: nil, created_at: now, updated_at: now, published_at: now}
    end

    Industry.pluck(:id, :name).each do |id, name|
      labels_data << {name:, slug: name.parameterize, skill_id: nil, industry_id: id, country_id: nil, created_at: now, updated_at: now, published_at: now}
    end

    Country.pluck(:id, :name) do |id, name|
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
  end

  def populate_reviews
    reviews_data = []
    rating_keys = %w[skills availability communication quality_of_work adherence_to_schedule]
    specialist_ids.each do |specialist_id|
      3.times do
        ratings = rating_keys.index_with { rand(1..5) }
        case_study_article_id = [nil, article_ids.sample].sample
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

  def populate_guild_posts
    posts_data = []
    10.times do
      posts_data << {title: Faker::Hipster.sentence, specialist_id: specialist_ids.sample, body: Faker::Hipster.paragraph, audience_type: Guild::Post::AUDIENCE_TYPES.sample, status: 1, created_at: now, updated_at: now}
    end
    @posts = Guild::Post.insert_all(posts_data).pluck("id")
  end

  def populate_companies
    companies_data = []
    10.times do
      companies_data << {name: Faker::Company.name, business_type: Company::VALID_BUSINESS_TYPES.sample, sales_person_id: sales_person.id, created_at: now, updated_at: now}
    end
    @company_ids = Company.insert_all(companies_data).pluck("id")
  end

  def populate_agreements
    agreements_data = []
    User.pluck(:id, :company_id).product(specialist_ids).each do |(user_id, company_id), specialist_id|
      due_days = rand(30)
      due_days = nil if due_days < 10
      agreements_data << {uid: Agreement.generate_uid, company_id:, user_id:, specialist_id:, status: Agreement::VALID_STATUSES.sample, collaboration: Agreement::VALID_COLLABORATIONS.sample, invoicing: Agreement::VALID_INVOICINGS.sample, hourly_rate: rand(1000) * 100, due_days:, created_at: now, updated_at: now}
    end
    @agreement_ids = Agreement.insert_all(agreements_data).pluck("id")
  end

  def populate_payment_requests
    payment_requests_data = []
    due = 5.days.from_now
    Agreement.pluck(:id, :company_id).each do |agreement_id, company_id|
      rand(0..3).times do
        status = PaymentRequest::VALID_STATUSES.sample
        dispute_reason = status == "disputed" ? Faker::Hipster.sentence : nil
        line_items = []
        rand(1..5).times do
          line_items << {description: Faker::Commerce.product_name, amount: Faker::Number.number(digits: 5)}
        end
        payment_requests_data << {uid: PaymentRequest.generate_uid, company_id:, agreement_id:, specialist_id: specialist_ids.sample, status:, dispute_reason:, line_items:, due_at: due, created_at: now, updated_at: now}
      end
    end
    @payment_requests = PaymentRequest.insert_all(payment_requests_data).pluck("id")
  end

  def populate_payments
    approved_payment_requests = PaymentRequest.where(status: %w[approved paid]).pluck(:id, :line_items, :company_id, :specialist_id)
    payments_data = []
    payouts_data = []
    approved_payment_requests.each do |id, line_items, company_id, specialist_id|
      amount = line_items.sum { |li| li["amount"] }
      payments_data << {uid: Payment.generate_uid, payment_request_id: id, company_id:, specialist_id:, amount:, admin_fee: (amount * 0.05).round, status: Payment::VALID_STATUSES.sample, created_at: now, updated_at: now}
      payouts_data << {uid: Payout.generate_uid, payment_request_id: id, specialist_id:, amount:, sourcing_fee: (amount * 0.08).round, status: Payout::VALID_STATUSES.sample, created_at: now, updated_at: now}
    end
    @payments = Payment.insert_all(payments_data).pluck("id")
    @payouts = Payout.insert_all(payouts_data).pluck("id")
  end

  def attach_images_to_cs_contents
    puts "Attaching images to articles…"
    download_images if missing_images_count.positive?
    CaseStudy::ImagesContent.find_each do |content|
      @unsplash_images.sample(rand(1..5)).each do |image|
        content.images.attach(io: File.open(image), filename: image.split("/").last)
      end
    end
  end

  def article_ids
    @article_ids ||= CaseStudy::Article.pluck("id")
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
            completed_tutorials: %w[introductory_call],
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
            completed_tutorials: [],
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
