# frozen_string_literal: true

FactoryBot.define do
  factory :specialist do
    account { create(:account, completed_tutorials: %w[onboarding]) }
    country
    city { "City" }
    application_stage { "Accepted" }
    bank_holder_name { "Jane Doe" }
    bank_currency { "EUR" }
    bio { "I have the best words. I write the best placeholder text, and I'm the biggest developer on the web by far ... That other text? They’re bringing mistakes. We are going to make placeholder text great again." }
    hourly_rate { 200 }
    average_score { 75 }
    sequence(:uid) { "spe_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "recspecialist#{id}" }
    bank_holder_address do
      {
        "line1" => "line1",
        "line2" => "line2",
        "city" => "city",
        "state" => "state",
        "country" => "country",
        "postcode" => "postcode"
      }
    end

    trait :rejected do
      application_stage { "Rejected By Us" }
    end
  end
end
