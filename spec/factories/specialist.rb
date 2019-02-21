FactoryBot.define do
  factory :specialist do
    country
    first_name "Jane"
    last_name "Doe"
    city "City"
    password "testing123"
    sequence(:airtable_id) { |id| "airtable_#{id}" }
    sequence(:email) { |n| "specialist_#{n}@test.com" }
  end
end
