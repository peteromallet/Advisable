# frozen_string_literal: true

class Types::ConversationType < Types::BaseType
  field :id, ID, null: false
  field :participants, [Types::AccountType], null: false
  field :messages, [Types::MessageType], null: false
  field :last_message, Types::MessageType, null: true

  def participants
    object.accounts
  end

  def last_message
    object.messages.order(created_at: :desc).first
  end
end
