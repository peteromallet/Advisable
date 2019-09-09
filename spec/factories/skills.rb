FactoryBot.define do
  factory :skill do
    name { "Skill Name" }
    sequence(:uid) { "ski_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |n| "rec_#{n} "}
  end
end
