# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    account
    country
    company
    title { "CTO" }
    application_status { "Accepted" }
    sequence(:uid) { "use_#{SecureRandom.hex[0..14]}" }
    sequence(:airtable_id) { |n| "recuser#{n}" }

    availability do
      [
        2.days.from_now.change({hour: 12, min: 0, sec: 0}),
        2.days.from_now.change({hour: 12, min: 30, sec: 0})
      ]
    end

    trait :team_manager do
      association :account, :team_manager
    end

    trait :editor do
      association :account, :editor
    end
  end
end
