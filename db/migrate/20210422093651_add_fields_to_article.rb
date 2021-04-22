# frozen_string_literal: true

class AddFieldsToArticle < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      change_column :case_study_articles, :comment, :text
      remove_column :case_study_articles, :company_type, :string
      add_column :case_study_articles, :company_type, :jsonb
      add_column :case_study_articles, :targeting, :jsonb
      add_column :case_study_articles, :editor_note, :text
      add_column :case_study_articles, :freelancer_edits, :text
    end
  end
end
