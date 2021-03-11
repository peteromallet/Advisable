# frozen_string_literal: true

class CreateLabelings < ActiveRecord::Migration[6.1]
  def change
    create_table :labelings, id: :uuid do |t|
      t.references :label, null: false, foreign_key: true, type: :uuid
      t.references :guild_post, null: false, foreign_key: true, type: :uuid

      t.index %i[label_id guild_post_id], unique: true
      t.timestamps
    end
  end
end
