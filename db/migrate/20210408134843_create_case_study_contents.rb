# frozen_string_literal: true

class CreateCaseStudyContents < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_contents do |t|
      t.string :uid, null: false, index: true
      t.references :section, null: false, foreign_key: {to_table: :case_study_sections}
      t.string :type
      t.integer :position
      t.jsonb :content

      t.timestamps
    end
  end
end
