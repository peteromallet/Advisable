# frozen_string_literal: true

FactoryBot.define do
  factory :application do
    sequence(:uid) { "app_#{SecureRandom.hex[0..14]}" }
    specialist
    score { 90 }
    status { "Applied" }
    invoice_rate { 24000 }
    project_type { "Fixed" }
    availability { "2 Weeks" }
    introduction { "Hi there" }
  end
end
