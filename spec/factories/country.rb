# frozen_string_literal: true
FactoryBot.define do
  factory :country do
    name { "Ireland" }
    currency { "EUR" }
    alpha2 { "IE" }
    eu { true }
    sequence(:uid) { "cou_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "reccountry#{id}" }
  end
end
