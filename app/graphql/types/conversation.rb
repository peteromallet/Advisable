# frozen_string_literal: true

module Types
  class Conversation < Types::BaseType
    description "Type for the Conversation model."

    field :id, ID, null: false, method: :uid

    field :participants, [Types::Account], null: false
    def participants
      ::Account.where(id: object.participants.select(:account_id))
    end

    field :messages, Types::Message.connection_type, null: true
    def messages
      object.messages.order(created_at: :asc)
    end

    field :last_read_at, GraphQL::Types::ISO8601DateTime, null: false
    def last_read_at
      participant&.last_read_at || object.created_at
    end

    field :last_message, Types::Message, null: true
    def last_message
      object.messages.order(created_at: :asc).last
    end

    field :unread_message_count, Int, null: false
    def unread_message_count
      return 0 if participant.nil?

      object.messages.
        where.not(author_id: current_account_id).
        where(created_at: last_read_at..).
        count
    end

    private

    # Can return `nil` if we're an admin logged in as that user
    def participant
      object.participants.find_by(account_id: current_account_id)
    end
  end
end
