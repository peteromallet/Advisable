FactoryBot.define do
  factory :country do
    name "Ireland"
    currency "EUR"
    sequence(:uid) { |id| "cou_#{id}" }
    sequence(:airtable_id) { |id| "airtable_country_#{id}" }
  end
end
