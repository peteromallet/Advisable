# frozen_string_literal: true

class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :uid, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.string :url
      t.string :color, null: false
      t.references :host, index: true, foreign_key: {to_table: :specialists}
      t.integer :attendees_count, default: 0
      t.boolean :published, default: false
      t.boolean :featured, default: false
      t.datetime :starts_at
      t.datetime :ends_at
      t.timestamps
    end
  end
end
