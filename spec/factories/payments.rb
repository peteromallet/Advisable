# frozen_string_literal: true

FactoryBot.define do
  factory :payment do
    sequence(:uid) { "pay_#{SecureRandom.hex[0..14]}" }
    amount { 100 }
    admin_fee { 10 }
    status { "pending" }
    company
    specialist
  end
end
