# frozen_string_literal: true

class CreateConversations < ActiveRecord::Migration[6.1]
  def change
    create_table :conversations do |t|
      t.string :uid, null: false

      t.timestamps
      t.index :uid, unique: true
    end
  end
end
