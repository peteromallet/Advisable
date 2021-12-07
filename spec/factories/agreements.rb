# frozen_string_literal: true

FactoryBot.define do
  factory :agreement do
    sequence(:uid) { "agr_#{SecureRandom.hex[0..14]}" }
    user
    company
    specialist
    status { "pending" }
  end
end
