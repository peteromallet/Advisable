# frozen_string_literal: true

class ConversationPolicy < BasePolicy
  def create_message?
    conversation_participant? || admin?
  end
  alias update_last_read? create_message?

  private

  def conversation_participant?
    participants = record.participants
    return unless participants.any?

    participants.pluck(:account_id).include?(current_user.account_id)
  end
end
