# frozen_string_literal: true

module Types
  class Message < Types::BaseType
    graphql_name "Message"
    description "Type for the Message model."

    field :id, ID, null: false, method: :uid
    field :content, String, null: false
    field :author, Types::Account, null: false
    field :conversation, Types::Conversation, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :attachments, [Types::AttachmentType], null: true
  end
end
