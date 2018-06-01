FactoryBot.define do
  factory :country do
    name "Ireland"
    currency "EUR"
    sequence(:airtable_id) { |id| "airtable_#{id}" }
  end
end
