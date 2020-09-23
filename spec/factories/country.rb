FactoryBot.define do
  factory :country do
    name { "Ireland" }
    currency { "EUR" }
    alpha2 { "IE" }
    sequence(:uid) { "cou_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "reccountry#{id}" }
  end
end
