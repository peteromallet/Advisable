# frozen_string_literal: true

module Types
  module MessageInterface
    include Types::BaseInterface

    description "Fields that are common for all message types"

    field :id, ID, null: false, method: :uid
    field :content, String, null: true
    field :conversation, Types::Conversation, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :attachments, [Types::AttachmentType], null: true

    orphan_types Types::UserMessage, Types::SystemMessage

    definition_methods do
      def resolve_type(object, _)
        if object.author_id.present?
          Types::UserMessage
        elsif object.author_id.blank?
          Types::SystemMessage
        else
          raise "Unknown message type: #{object.inspect}"
        end
      end
    end
  end
end
