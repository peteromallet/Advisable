FactoryBot.define do
  factory :industry do
    sequence(:airtable_id) { |id| "industry_#{id}" }
    name { 'Advertising' }
  end
end
