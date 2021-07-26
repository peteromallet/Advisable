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

      all_new = conversation.messages
      last_at = participant.conversation.messages.where(author_id: participant.account_id).maximum(:created_at)
      all_new = all_new.where("created_at > ?", last_at) if last_at
      AccountMailer.notify_of_new_messages(participant.account, all_new.pluck(:id)).deliver_later
    end
  end
end
