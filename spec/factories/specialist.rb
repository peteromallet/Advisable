FactoryBot.define do
  factory :specialist do
    country
    first_name "Jane"
    last_name "Doe"
    city "City"
    sequence(:airtable_id) { |id| "airtable_#{id}" }
  end
end
