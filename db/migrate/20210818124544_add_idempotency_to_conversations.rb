# frozen_string_literal: true

class AddIdempotencyToConversations < ActiveRecord::Migration[6.1]
  def change
    add_column :conversations, :idempotency_key, :string
    add_column :messages, :idempotency_key, :string

    safety_assured do
      add_index :conversations, :idempotency_key
      add_index :messages, :idempotency_key
    end
  end
end
