# frozen_string_literal: true

class AddLogidzeToCaseStudyIndustries < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_industries, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_case_study_industries, on: :case_study_industries
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_case_study_industries on case_study_industries;"
      end
    end
  end
end
