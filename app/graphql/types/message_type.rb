# frozen_string_literal: true

class Types::MessageType < Types::BaseType
  field :id, ID, null: false
  field :content, String, null: false
  field :account, Types::AccountType, null: false
  field :conversation, Types::ConversationType, null: false
  field :created_at, GraphQL::Types::ISO8601DateTime, null: true
end
