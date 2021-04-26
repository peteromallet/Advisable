# frozen_string_literal: true

class CreatePostPrompts < ActiveRecord::Migration[6.1]
  def change
    create_table :post_prompts, id: :uuid do |t|
      t.text :prompt
      t.string :cta
      t.integer :guild_posts_count, default: 0
      t.boolean :featured, default: false
      t.references :label, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
