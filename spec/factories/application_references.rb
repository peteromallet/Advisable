FactoryBot.define do
  factory :application_reference do
    application
    association :project, factory: :previous_project
  end
end
