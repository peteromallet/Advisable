FactoryBot.define do
  factory :sales_person do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    username { Faker::Internet.username }
    active { false }
    out_of_office { false }
    slack { Faker::Internet.username }
    calendly_url { Faker::Internet.url }
    asana_id { SecureRandom.uuid }
    airtable_id { SecureRandom.uuid }
  end
end
