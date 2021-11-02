# frozen_string_literal: true

class AddSlugToCaseStudyArticle < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_column :case_study_articles, :slug, :string
      add_index :case_study_articles, :slug, unique: true
    end
  end
end
