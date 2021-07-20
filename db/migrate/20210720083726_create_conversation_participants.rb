# frozen_string_literal: true

class CreateConversationParticipants < ActiveRecord::Migration[6.1]
  def change
    create_table :conversation_participants do |t|
      t.references :account, null: false, foreign_key: true
      t.references :conversation, null: false, foreign_key: true
      t.datetime :last_read_at

      t.timestamps
    end
  end
end
