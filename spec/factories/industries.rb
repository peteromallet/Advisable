# frozen_string_literal: true

FactoryBot.define do
  factory :industry do
    active { true }
    sequence(:airtable_id) { |id| "recindustry#{id}" }
    name { Faker::IndustrySegments.unique.industry }
  end
end
