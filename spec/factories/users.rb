# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    account { create(:account, completed_tutorials: %w[onboarding feed]) }
    country
    company
    title { "CTO" }
    application_status { "Application Accepted" }
    sequence(:uid) { "use_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |n| "recuser#{n}" }

    trait :team_manager do
      association :account, :team_manager
    end

    trait :editor do
      association :account, :editor
    end
  end
end
