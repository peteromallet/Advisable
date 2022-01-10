# frozen_string_literal: true

FactoryBot.define do
  factory :label do
    sequence(:name) { |n| "label_name_#{n}" }
    description { "description" }
    published_at { Time.zone.now }

    trait :with_skill do
      skill { association :skill, name: }
    end

    trait :with_country do
      country { association :country, name: }
    end

    trait :with_industry do
      industry { association :industry, name: }
    end
  end
end
