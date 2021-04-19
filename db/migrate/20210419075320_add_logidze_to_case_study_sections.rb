# frozen_string_literal: true

class AddLogidzeToCaseStudySections < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_sections, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_case_study_sections, on: :case_study_sections
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_case_study_sections on case_study_sections;"
      end
    end
  end
end
