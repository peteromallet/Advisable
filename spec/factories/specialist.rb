FactoryBot.define do
  factory :specialist do
    country
    first_name { "Jane" }
    last_name { "Doe" }
    city { "City" }
    password { "testing123" }
    confirmed_at { 1.day.ago }
    bank_holder_name { "Jane Doe" }
    bank_currency { "EUR" }
    sequence(:uid) { "spe_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "specialist_#{id}" }
    sequence(:email) { |n| "specialist_#{n}@test.com" }
    bank_holder_address {{
      "line1" => "line1",
      "line2" => "line2",
      "city" => "city",
      "state" => "state",
      "country" => "country",
      "postcode" => "postcode",
    }}
  end
end
