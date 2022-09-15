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

    orphan_types Types::UserMessage,
      Types::SystemMessage,
      Types::GuildPostMessage,
      *Types::Messages.constants.map { |k| "Types::Messages::#{k}".constantize }

    definition_methods do
      def resolve_type(object, _)
        if object.kind && Object.const_defined?("Types::Messages::#{object.kind.camelize}")
          Object.const_get("Types::Messages::#{object.kind.camelize}")
        elsif object.system_message?
          Types::SystemMessage
        elsif object.guild_post_id
          Types::GuildPostMessage
        else
          Types::UserMessage
        end
      end
    end
  end
end
