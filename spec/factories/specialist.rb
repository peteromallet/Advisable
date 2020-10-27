FactoryBot.define do
  factory :specialist do
    account
    country
    city { 'City' }
    bank_holder_name { 'Jane Doe' }
    bank_currency { 'EUR' }
    hourly_rate { 200 }
    average_score { 75 }
    automated_invitations_subscription { true }
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
