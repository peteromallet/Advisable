FactoryBot.define do
  factory :specialist do
    country
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    city { 'City' }
    password { 'testing123' }
    confirmed_at { 1.day.ago }
    bank_holder_name { 'Jane Doe' }
    bank_currency { 'EUR' }
    hourly_rate { 200 }
    average_score { 75 }
    sequence(:uid) { "spe_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |id| "specialist_#{id}" }
    sequence(:email) { |n| "specialist_#{n}@test.com" }
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
