# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :uid, null: false
      t.text :content
      t.references :author, null: false, foreign_key: {to_table: :accounts}
      t.references :conversation, null: false, foreign_key: true

      t.timestamps
      t.index :uid, unique: true
    end
  end
end
