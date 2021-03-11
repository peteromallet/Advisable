# frozen_string_literal: true

FactoryBot.define do
  factory :label do
    sequence(:name) { |n| "label_name_#{n}" }
    published { Time.zone.now }
  end
end
