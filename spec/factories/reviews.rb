# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    specialist
    project { association :previous_project }
    sequence(:uid) { "rev_#{SecureRandom.hex[0..14]}" }
    comment { Faker::Lorem.sentence(word_count: 24) }
    ratings { {overall: 5} }
  end
end
