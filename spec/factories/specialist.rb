FactoryBot.define do
  factory :specialist do
    country
    first_name "Jane"
    last_name "Doe"
    city "City"
    password "testing123"
    confirmed_at 1.day.ago
    sequence(:uid) { |n| "spe_#{n}" }
    sequence(:airtable_id) { |id| "specialist_#{id}" }
    sequence(:email) { |n| "specialist_#{n}@test.com" }
  end
end
