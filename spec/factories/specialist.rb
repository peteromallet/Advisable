# frozen_string_literal: true

FactoryBot.define do
  factory :specialist do
    account
    country
    city { 'City' }
    application_stage { "Accepted" }
    bank_holder_name { 'Jane Doe' }
    bank_currency { 'EUR' }
    hourly_rate { 200 }
    average_score { 75 }
    sequence(:uid) { "spe_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "recspecialist#{id}" }
    bank_holder_address do
      {
        'line1' => 'line1',
        'line2' => 'line2',
        'city' => 'city',
        'state' => 'state',
        'country' => 'country',
        'postcode' => 'postcode'
      }
    end

    trait :guild do
      guild { true }
    end
  end
end
