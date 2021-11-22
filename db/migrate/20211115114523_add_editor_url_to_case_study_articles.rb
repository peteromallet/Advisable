# frozen_string_literal: true

class AddEditorUrlToCaseStudyArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_articles, :editor_url, :string
  end
end
