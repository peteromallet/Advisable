# frozen_string_literal: true

class RemoveArchivedAtFromCaseStudySharedArticles < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :case_study_shared_articles, :archived_at, :timestamp
    end
  end
end
