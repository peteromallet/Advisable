# frozen_string_literal: true

FactoryBot.define do
  factory :recommended_specialist do
    match_category { "skill" }
    specialist
    recommendation { association(:specialist) }
  end
end
