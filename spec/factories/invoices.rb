# frozen_string_literal: true

FactoryBot.define do
  factory :invoice do
    sequence(:uid) { "inv_#{SecureRandom.hex[0..14]}" }
    company
    year { 2021 }
    month { 9 }
  end
end
