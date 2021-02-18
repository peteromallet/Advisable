# frozen_string_literal: true

class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications, id: :uuid do |t|
      t.references :account, null: false, foreign_key: true
      t.references :actor, foreign_key: {to_table: :accounts}
      t.string :action, null: false
      t.references :notifiable, polymorphic: true, null: false, type: :uuid
      t.datetime :read_at
      t.timestamps
    end
  end
end
