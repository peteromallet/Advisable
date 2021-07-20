# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    content { "This is a content of a Message." }
    author { association :account }
    conversation
  end
end
