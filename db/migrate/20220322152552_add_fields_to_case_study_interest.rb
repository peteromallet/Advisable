# frozen_string_literal: true

class AddFieldsToCaseStudyInterest < ActiveRecord::Migration[7.0]
  def change
    add_column :case_study_interests, :term_data, :jsonb
    add_column :case_study_interests, :min_score, :decimal
  end
end
