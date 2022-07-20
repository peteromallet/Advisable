# frozen_string_literal: true

class CreateCaseStudyTopics < ActiveRecord::Migration[7.0]
  def change
    create_table :case_study_topics do |t|
      t.string :uid, null: false
      t.string :slug, null: false
      t.string :name
      t.string :icon
      t.integer :position
      t.text :description
      t.citext :term
      t.jsonb :term_data

      t.timestamps

      t.index :uid, unique: true
      t.index :slug, unique: true
    end
  end
end
