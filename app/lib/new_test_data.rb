# frozen_string_literal: true

# rubocop:disable Rails/SkipsModelValidations
class NewTestData
  extend Memoist

  attr_reader :yml, :now, :sales_person, :country, :company

  def self.seed_from_airtable!
    yml = YAML.load_file("db/seeds/test_data.yml")

    Skill.delete_all
    Airtable::Skill.sync(filter: nil)
    attrs = %i[name category profile uid active airtable_id]
    yml[:skills] = Skill.pluck(*attrs).map { |p| attrs.zip(p).to_h }

    Industry.delete_all
    Airtable::Industry.sync(filter: nil)
    attrs = %i[name color active uid airtable_id]
    yml[:industries] = Industry.pluck(*attrs).map { |p| attrs.zip(p).to_h }

    File.write("db/seeds/test_data.yml", yml.to_yaml)
  end

  def initialize
    @yml = YAML.load_file("db/seeds/test_data.yml")
    @now = Time.zone.now
    @sales_person = SalesPerson.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, username: Faker::Internet.username)
    @country = Country.find_or_create_by(name: "Ireland")
    @company = Company.find_or_create_by(name: "Advisable", sales_person: sales_person)
  end

  def seed!
    populate_skills
    populate_industries
    populate_advisable

    binding.pry
  end

  def populate_skills
    skills_data = yml[:skills].map do |skill|
      skill.merge(created_at: now, updated_at: now)
    end
    Skill.delete_all
    Skill.insert_all(skills_data)
  end

  def populate_industries
    industries_data = yml[:industries].map do |skill|
      skill.merge(created_at: now, updated_at: now)
    end
    Industry.delete_all
    Industry.insert_all(industries_data)
  end

  def populate_advisable
    accounts = Account.upsert_all(advisable_data.pluck(:account), unique_by: :email)
    accounts.each_with_index do |account, i|
      key = i.even? ? :specialist : :user
      advisable_data[i][key][:account_id] = account["id"]
    end
    specialist_data = advisable_data.pluck(:specialist).compact
    user_data = advisable_data.pluck(:user).compact
    specialists = Specialist.upsert_all(specialist_data, unique_by: :account_id)
    users = User.upsert_all(user_data, unique_by: :account_id)

    Specialist.where(id: specialists.pluck("id")).each_with_index do |specialist, i|
      path = "db/seeds/assets/avatars/#{yml[:advisable][i][:avatar]}"
      specialist.avatar.attach(io: File.open(path), filename: yml[:advisable][i][:avatar])
    end

    User.where(id: users.pluck("id")).each_with_index do |user, i|
      path = "db/seeds/assets/avatars/#{yml[:advisable][i][:avatar]}"
      user.avatar.attach(io: File.open(path), filename: yml[:advisable][i][:avatar])
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
