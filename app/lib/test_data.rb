# frozen_string_literal: true

require "ruby-progressbar"
require "zip"

# rubocop:disable Rails/SkipsModelValidations
class TestData
  DATA_DIR = "db/seeds/data"
  PRUNED_DIR = "#{DATA_DIR}/pruned".freeze
  ZIP_NAME = "test_data_2022_08_v1.zip"
  ZIP_PATH = "#{DATA_DIR}/#{ZIP_NAME}".freeze
  ICONS_PATH = "db/seeds/assets/icons/"
  IMAGES_PATH = "db/seeds/assets/images/"
  AMOUNT_OF_RANDOM_IMAGES = 100

  attr_reader :now

  def initialize
    @test_data = YAML.load_file(Rails.root.join("db", "seeds", "test_data.yml"))
    @unsplash_images = Dir.glob("#{IMAGES_PATH}*.jpg")
    @now = Time.zone.now
  end

  def seed!
    ensure_csv_files_exist
    populate_pruned_data if CaseStudy::Article.none?
    [Label, Review, Event, Guild::Post, Agreement, PaymentRequest, Payment].each do |model|
      next unless model.none?

      puts "Populating #{model.table_name}…"
      __send__("populate_#{model.table_name}")
    end
    create_topics
    reset_pkey_sequences
  end

  def create_topics
    @test_data["topics"].each do |t|
      topic = CaseStudy::Topic.create({
        name: t["name"],
        term: t["term"],
      })

      icon_file = t["icon"] + ".svg"
      icon_path = File.join(ICONS_PATH, icon_file)
      icon = File.open(icon_path)
      topic.icon.attach(io: icon, filename: icon_file)
    end
  end

  private

  def ensure_csv_files_exist
    unless File.exist?(ZIP_PATH)
      obj = Aws::S3::Object.new(bucket_name: ENV.fetch("AWS_S3_BUCKET", nil), key: ZIP_NAME)
      obj.download_file(ZIP_PATH)
    end

    FileUtils.rm_rf(PRUNED_DIR)
    FileUtils.mkdir(PRUNED_DIR)
    Zip::File.open(ZIP_PATH) do |zip_file|
      zip_file.each { |entry| entry.extract("#{PRUNED_DIR}/#{entry.name}") }
    end
  end

  def reset_pkey_sequences
    puts "Resetting pkey sequences…"
    ActiveRecord::Base.connection.tables.each do |t|
      ActiveRecord::Base.connection.reset_pk_sequence!(t)
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
    ProductionData.new.populate_local_tables(source_dir: PRUNED_DIR)
    LocalData.new.populate_local_tables(source_dir: PRUNED_DIR)
    FixturesData.new.attach_images!
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
end
# rubocop:enable Rails/SkipsModelValidations
