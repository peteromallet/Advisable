FactoryBot.define do
  factory :review do
    specialist
    project
    sequence(:uid) { "rev_#{SecureRandom.hex[0..14]}" }
    association :reviewable, factory: :application
    comment { 'Comment' }
    ratings { { overall: 5 } }
  end
end
