# frozen_string_literal: true

class AddResolvedAtToCaseStudySearchFeedback < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_search_feedbacks, :resolved_at, :datetime
  end
end
