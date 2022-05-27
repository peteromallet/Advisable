# frozen_string_literal: true

FactoryBot.define do
  factory :interview do
    status { "Call Scheduled" }
    sequence(:uid) { "int_#{SecureRandom.hex[0..14]}" }
    starts_at { 2.days.from_now.change({hour: 12, min: 0, sec: 0}) }

    trait :with_specialist_and_user do
      accounts { [create(:specialist).account, create(:user).account] }
    end
  end
end
