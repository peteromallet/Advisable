# frozen_string_literal: true

class AddLogidzeToCaseStudyInterests < ActiveRecord::Migration[7.0]
  def change
    add_column :case_study_interests, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_case_study_interests, on: :case_study_interests
      end

      dir.down do
        execute <<~SQL
          DROP TRIGGER IF EXISTS "logidze_on_case_study_interests" on "case_study_interests";
        SQL
      end
    end
  end
end
