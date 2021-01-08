# frozen_string_literal: true

FactoryBot.define do
  factory :problematic_flag do
    application
    user
    message { "This guy. Ugh." }
  end
end
