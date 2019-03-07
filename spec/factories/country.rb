FactoryBot.define do
  factory :country do
    name "Ireland"
    currency "EUR"
    sequence(:uid) { |id| "cou_#{id}" }
    sequence(:airtable_id) { |id| "airtable_#{id}" }
  end
end
