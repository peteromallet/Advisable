FactoryBot.define do
  factory :review do
    specialist
    project
    sequence(:uid) { "rev_#{SecureRandom.hex[0..14]}" }
    association :reviewable, factory: :application
    comment { Faker::Lorem.sentence(word_count: 24) }
    ratings { { overall: 5 } }
  end
end
