FactoryBot.define do
  factory :account do
    country
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    sequence(:uid) { "spe_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "recspecialist#{id}" }
    sequence(:email) { |n| "specialist_#{n}@test.com" }
    password { 'testing123' }
    confirmed_at { 1.day.ago }
  end
end
