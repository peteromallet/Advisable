# frozen_string_literal: true

class CreateCaseStudyIndustries < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_industries do |t|
      t.string :uid, null: false, index: true
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.references :industry, null: false, foreign_key: true

      t.timestamps
    end
  end
end
