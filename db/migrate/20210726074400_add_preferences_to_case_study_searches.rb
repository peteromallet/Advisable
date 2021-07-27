# frozen_string_literal: true

class AddPreferencesToCaseStudySearches < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_searches, :preferences, :jsonb
  end
end
