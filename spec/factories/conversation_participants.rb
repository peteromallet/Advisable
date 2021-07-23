# frozen_string_literal: true

FactoryBot.define do
  factory :conversation_participant do
    account
    conversation
  end
end
