# frozen_string_literal: true

class AddResultsToCaseStudySearches < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_searches, :results, :jsonb
  end
end
