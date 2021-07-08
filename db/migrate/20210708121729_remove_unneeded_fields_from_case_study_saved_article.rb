# frozen_string_literal: true

class RemoveUnneededFieldsFromCaseStudySavedArticle < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :case_study_saved_articles, :search_id, :string
      remove_column :case_study_saved_articles, :shared_by_id, :string
    end
  end
end
