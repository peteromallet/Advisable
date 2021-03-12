# frozen_string_literal: true

FactoryBot.define do
  factory :guild_event, class: 'Guild::Event' do
    title       { Faker::Quote.yoda[0..149] }
    description { Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false) }
    url         { "http://www.google.com" }
    host        { create(:specialist) }
    starts_at   { 1.hour.from_now }
    ends_at     { 2.hours.from_now }
    published   { true }
  end
end
