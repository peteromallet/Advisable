# frozen_string_literal: true

FactoryBot.define do
  factory :unresponsiveness_report do
    application
    user
    message { "This mofo does nothing. I tell you. Worst guy ever." }
  end
end
