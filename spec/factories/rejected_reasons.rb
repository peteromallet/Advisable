FactoryBot.define do
  factory :application_rejection_reason do
    reason "MyString"
    sequence(:airtable_id) { |id| "airtable_reason_#{id}" }
  end
end
