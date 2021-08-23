# frozen_string_literal: true

module Types
  class Conversation < Types::BaseType
    description "Type for the Conversation model."

    field :id, ID, null: false, method: :uid

    field :participants, [Types::Account], null: false
    def participants
      object.participants.map(&:account)
    end
    field :messages, Types::MessageInterface.connection_type, null: true
    def messages
      object.messages.order(created_at: :asc)
    end

    field :last_read_at, GraphQL::Types::ISO8601DateTime, null: false
    def last_read_at
      participant&.last_read_at || object.created_at
    end

    field :last_message, Types::MessageInterface, null: true
    def last_message
      object.messages.order(created_at: :asc).last
    end

    field :unread_count, Int, null: false
    def unread_count
      participant&.unread_count || 0
    end

    private

    # Can return `nil` if we're an admin logged in as that user
    def participant
      object.participants.find { |p| p.account_id == current_account_id }
    end
  end
end
