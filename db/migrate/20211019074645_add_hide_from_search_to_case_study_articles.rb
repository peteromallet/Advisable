# frozen_string_literal: true

class AddHideFromSearchToCaseStudyArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_articles, :hide_from_search, :boolean, default: false
  end
end
