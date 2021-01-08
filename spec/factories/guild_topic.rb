# frozen_string_literal: true

FactoryBot.define do
  factory :guild_topic, class: 'Guild::Topic' do
    published { true }
    sequence(:name) { |n| "topic_name_#{n}" }
  end
end
