# frozen_string_literal: true

FactoryBot.define do
  factory :conversation_participant do
    account
    conversation
    last_read_at { "2021-07-20 10:37:26" }
  end
end
