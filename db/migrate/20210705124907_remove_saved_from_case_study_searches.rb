# frozen_string_literal: true

class RemoveSavedFromCaseStudySearches < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :case_study_searches, :saved, :jsonb
    end
  end
end
