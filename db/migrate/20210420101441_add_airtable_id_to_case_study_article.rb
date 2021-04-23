# frozen_string_literal: true

class AddAirtableIdToCaseStudyArticle < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_column :case_study_articles, :airtable_id, :string
      add_index :case_study_articles, :airtable_id, unique: true
    end
  end
end
