FactoryBot.define do
  factory :skill do
    name "Skill Name"
    sequence(:uid) { |n| "ski_#{n} "}
    sequence(:airtable_id) { |n| "rec_#{n} "}
  end
end
