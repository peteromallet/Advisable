# frozen_string_literal: true

FactoryBot.define do
  factory :interview do
    application
    specialist { application.specialist }
    user
    status { "Call Scheduled" }
    sequence(:uid) { "int_#{SecureRandom.hex[0..14]}" }
    starts_at { 2.days.from_now.change({hour: 12, min: 0, sec: 0}) }
  end
end
