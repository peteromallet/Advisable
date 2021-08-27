# frozen_string_literal: true

class AddDeletedAtToCaseStudyArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_articles, :deleted_at, :datetime
  end
end
