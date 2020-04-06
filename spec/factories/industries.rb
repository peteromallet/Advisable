FactoryBot.define do
  factory :industry do
    active { true }
    sequence(:airtable_id) { |id| "industry_#{id}" }
    name { 'Advertising' }
  end
end
