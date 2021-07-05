# frozen_string_literal: true

class RemoveArchivedFromCaseStudySearches < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :case_study_searches, :archived, :jsonb
    end
  end
end
