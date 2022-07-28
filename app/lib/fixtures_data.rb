# frozen_string_literal: true

# rubocop:disable Rails/SkipsModelValidations
class FixturesData
  CLASSES = [User, Specialist, Account, Company, SalesPerson, Country, CaseStudy::Topic].freeze
  TABLE_NAMES = CLASSES.map(&:table_name).freeze

  attr_reader :fixtures_yml, :now

  def initialize
    @fixtures_yml = YAML.load_file("db/seeds/fixtures.yml")
    @now = Time.zone.now
  end

  def seed!
    puts "Seeding fixtures data..."
    destroy_existing_data
    populate_sales_people
    populate_companies
    populate_countries
    populate_topics
    populate_advisable
    dump_data
  end

  def attach_images!
    attach_avatars!
    attach_topic_icons!
  end

  private

  def attach_avatars!
    puts "Attaching avatars..."
    fixtures_yml[:advisable].each do |person|
      path = "db/seeds/assets/avatars/#{person[:avatar]}"
      Account.find_by(email: person[:email]).avatar.attach(io: File.open(path), filename: person[:avatar])
      Account.find_by(email: person[:email].sub("@", "+specialist@")).avatar.attach(io: File.open(path), filename: person[:avatar])
    end
  end

  def attach_topic_icons!
    puts "Attaching topic icons..."
    fixtures_yml[:topics].each do |topic|
      CaseStudy::Topic.find_by(name: topic[:name]).icon.attach(io: File.open("db/seeds/assets/icons/#{topic[:icon]}.svg"), filename: topic[:icon])
    end
  end

  def destroy_existing_data
    Payment.delete_all
    Payout.delete_all
    PaymentRequest.delete_all
    Agreement.delete_all
    Event.delete_all
    Guild::Post.delete_all
    AuthProvider.delete_all
    CLASSES.each(&:delete_all)
  end

  def populate_sales_people
    sales_person_data = []
    3.times do
      sales_person_data << {uid: SalesPerson.generate_uid, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, username: Faker::Internet.username, created_at: now, updated_at: now}
    end
    @sales_person_ids = SalesPerson.insert_all(sales_person_data).pluck("id")
  end

  def populate_companies
    companies_data = []
    10.times do
      companies_data << {name: Faker::Company.name, business_type: Company::VALID_BUSINESS_TYPES.sample, sales_person_id: @sales_person_ids.sample, created_at: now, updated_at: now}
    end
    @company_ids = Company.insert_all(companies_data).pluck("id")
  end

  def populate_countries
    countries_data = []
    countries_data << {uid: Country.generate_uid, name: "Ireland", created_at: now, updated_at: now}
    5.times do
      countries_data << {uid: Country.generate_uid, name: Faker::Address.country, created_at: now, updated_at: now}
    end
    @country_ids = Country.insert_all(countries_data).pluck("id")
  end

  def populate_topics
    topics_data = fixtures_yml[:topics].map do |topic|
      {uid: CaseStudy::Topic.generate_uid, name: topic[:name], term: topic[:term], slug: topic[:name].parameterize, created_at: now, updated_at: now}
    end
    CaseStudy::Topic.insert_all(topics_data).pluck("id")
    CaseStudy::Topic.find_each(&:term_vector)
  end

  def populate_advisable
    advisable_data = parse_advisable_from_yml
    accounts = Account.upsert_all(advisable_data.pluck(:account), unique_by: :email).pluck("id")
    accounts.each_with_index do |account, i|
      key = i.even? ? :specialist : :user
      advisable_data[i][key][:account_id] = account
    end
    specialist_data = advisable_data.pluck(:specialist).compact
    user_data = advisable_data.pluck(:user).compact
    Specialist.upsert_all(specialist_data, unique_by: :account_id).pluck("id")
    User.upsert_all(user_data, unique_by: :account_id).pluck("id")
  end

  def dump_data
    FileUtils.mkdir_p(TestData::PRUNED_DIR)
    TABLE_NAMES.each { |table| `psql -d advisable_development -c "\\copy (SELECT * FROM #{table}) TO #{TestData::PRUNED_DIR}/#{table}.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)"` }
  end

  def parse_advisable_from_yml
    fixtures_yml[:advisable].flat_map do |advisable|
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
            country_id: @country_ids.sample,
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
            completed_tutorials: %w[onboarding feed],
            updated_at: now,
            created_at: now
          },
          user: {
            uid: User.generate_uid,
            company_id: @company_ids.sample,
            country_id: @country_ids.sample,
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
