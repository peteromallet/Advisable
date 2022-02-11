# frozen_string_literal: true

FactoryBot.define do
  factory :consultation do
    user
    skill
    specialist
    status { "Request Completed" }
    topic { "Consultation Topic" }
  end
end
