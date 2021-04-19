# frozen_string_literal: true

class AddLogidzeToCaseStudyContents < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_contents, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_case_study_contents, on: :case_study_contents
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_case_study_contents on case_study_contents;"
      end
    end
  end
end
