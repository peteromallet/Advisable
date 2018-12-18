FactoryBot.define do
  factory :skill do
    name "Skill Name"
    sequence(:airtable_id) { |n| "rec_#{n} "}
  end
end
