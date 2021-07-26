# frozen_string_literal: true

class MessageNotifierJob < ApplicationJob
  attr_reader :message, :conversation

  def perform(message)
    @message = message
    @conversation = message.conversation

    conversation.participants.each do |participant|
      next if participant.account == message.author

      new_ones = new_ones_for(participant)
      next if new_ones.any?

      AccountMailer.notify_of_new_messages(participant.account, new_ones).deliver_later
    end
  end

  private

  def new_ones_for(participant)
    conversation.messages.
      where.not(author_id: participant.account_id).
      where(created_at: message.created_at..)
  end
end
