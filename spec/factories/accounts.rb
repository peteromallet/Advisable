# frozen_string_literal: true

FactoryBot.define do
  factory :account do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    sequence(:uid) { "acc_#{SecureRandom.hex[0..14]}" }
    sequence(:email) { |n| "account_#{n}@test.com" }
    password { "testing123" }
    confirmed_at { 1.day.ago }

    availability do
      [
        2.days.from_now.change({hour: 12, min: 0, sec: 0}),
        2.days.from_now.change({hour: 12, min: 30, sec: 0})
      ]
    end

    trait :team_manager do
      permissions { ["team_manager"] }
    end

    trait :editor do
      permissions { ["editor"] }
    end

    trait :admin do
      permissions { ["admin"] }
    end
  end
end
