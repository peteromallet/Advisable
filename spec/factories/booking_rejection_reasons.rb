FactoryBot.define do
  factory :booking_rejection_reason do
    name { "Not Enough Experience" }
    sequence(:airtable_id) { |n| "rec_#{n}" }
  end
end
