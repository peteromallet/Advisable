# frozen_string_literal: true

FactoryBot.define do
  factory :label do
    sequence(:name) { |n| "label_name_#{n}" }
    description { "description" }
    published_at { Time.zone.now }
  end
end
