# frozen_string_literal: true

FactoryBot.define do
  factory :payout do
    sequence(:uid) { "pyo_#{SecureRandom.hex[0..14]}" }
    amount { 10000 }
    status { "pending" }
    specialist
  end
end
