# frozen_string_literal: true

FactoryBot.define do
  factory :consultation do
    user
    skill
    specialist
    status { "Request Started" }
    topic { "Consultation Topic" }
  end
end
