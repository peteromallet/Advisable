# frozen_string_literal: true

class AddLogidzeToCaseStudySearchFeedbacks < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_search_feedbacks, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_case_study_search_feedbacks, on: :case_study_search_feedbacks
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_case_study_search_feedbacks on case_study_search_feedbacks;"
      end
    end
  end
end
