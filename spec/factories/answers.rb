# frozen_string_literal: true

FactoryBot.define do
  factory :answer do
    question
    specialist
    content { "Black bear." }
  end
end
