# frozen_string_literal: true

FactoryBot.define do
  factory :guild_post, class: "Guild::Post" do
    title    { Faker::Quote.yoda[0..149] }
    body     { Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false) }
    status   { Guild::Post.statuses["published"] }
    specialist
  end
end
