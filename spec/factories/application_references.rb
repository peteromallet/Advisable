# frozen_string_literal: true

FactoryBot.define do
  factory :application_reference do
    application
    previous_project
  end
end
