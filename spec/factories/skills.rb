FactoryBot.define do
  factory :skill do
    name { 'Skill Name' }
    active { true }
    sequence(:uid) { "ski_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |n| "recskill#{n} " }
  end
end
