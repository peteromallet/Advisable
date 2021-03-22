# frozen_string_literal: true

class CreateLabels < ActiveRecord::Migration[6.1]
  def change
    create_table :labels, id: :uuid do |t|
      t.string :name
      t.string :slug, index: {unique: true}
      t.datetime :published_at
      t.integer :labelings_count
      t.references :country, foreign_key: true, index: {unique: true}
      t.references :industry, foreign_key: true, index: {unique: true}
      t.references :skill, foreign_key: true, index: {unique: true}

      t.timestamps
    end
  end
end
