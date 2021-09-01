# frozen_string_literal: true

class AddUnreadCountToConversationParticipant < ActiveRecord::Migration[6.1]
  def change
    add_column :conversation_participants, :unread_count, :int
  end
end
