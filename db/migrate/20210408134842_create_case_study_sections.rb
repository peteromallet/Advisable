# frozen_string_literal: true

class CreateCaseStudySections < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_sections, id: :uuid do |t|
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}, type: :uuid
      t.string :type
      t.integer :position

      t.timestamps
    end
  end
end
