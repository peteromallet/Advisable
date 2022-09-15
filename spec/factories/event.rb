# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    title { Faker::Quote.yoda[0..149] }
    description { Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false) }
    url { "http://www.google.com" }
    host { create(:specialist) }
    starts_at { 6.hours.from_now }
    ends_at { 8.hours.from_now }
    published_at { 1.day.ago }
  end
end
