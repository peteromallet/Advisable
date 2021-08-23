# frozen_string_literal: true

class MessageNotifierJob < ApplicationJob
  attr_reader :message, :conversation

  def perform(message)
    @message = message
    @conversation = message.conversation

    conversation.participants.each do |participant|
      next if participant.account == message.author

      new_ones = conversation.messages.
        where("created_at > ?", message.created_at).
        any?
      next if new_ones

      new_messages = conversation.messages
      last_at = participant.last_read_at
      new_messages = new_messages.where("created_at > ?", last_at) if last_at
      next if new_messages.empty?

      AccountMailer.notify_of_new_messages(participant.account, conversation, new_messages.pluck(:id)).deliver_later
    end
  end
end
