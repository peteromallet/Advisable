# frozen_string_literal: true

class AddResultsToCaseStudyTopic < ActiveRecord::Migration[7.0]
  def change
    add_column :case_study_topics, :result_ids, :jsonb
  end
end
