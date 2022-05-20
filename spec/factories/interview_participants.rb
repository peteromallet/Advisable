# frozen_string_literal: true

FactoryBot.define do
  factory :interview_participant do
    interview
    account
  end
end
