# frozen_string_literal: true

FactoryBot.define do
  factory :payment do
    sequence(:uid) { "pay_#{SecureRandom.hex[0..14]}" }
    amount { 10000 }
    status { "pending" }
    company
    specialist
  end
end
