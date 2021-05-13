# frozen_string_literal: true

class AddLogidzeToCaseStudySearches < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_searches, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_case_study_searches, on: :case_study_searches
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_case_study_searches on case_study_searches;"
      end
    end
  end
end
