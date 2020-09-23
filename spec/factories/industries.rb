FactoryBot.define do
  factory :industry do
    active { true }
    sequence(:airtable_id) { |id| "recindustry#{id}" }
    name { 'Advertising' }
  end
end
