FactoryBot.define do
  factory :country do
    name "Ireland"
    currency "EUR"
    sequence(:uid) { "cou_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "airtable_country_#{id}" }
  end
end
