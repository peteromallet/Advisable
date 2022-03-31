# frozen_string_literal: true

FactoryBot.define do
  factory :agreement do
    sequence(:uid) { "agr_#{SecureRandom.hex[0..14]}" }
    user
    company { user.company }
    specialist
    status { "pending" }
    invoicing { "after" }
    collaboration { "fixed" }
  end
end
