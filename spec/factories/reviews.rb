FactoryBot.define do
  factory :review do
    specialist
    project
    association :reviewable, factory: :application
    comment "Comment"
    ratings {{
      overall: 5
    }}
  end
end
