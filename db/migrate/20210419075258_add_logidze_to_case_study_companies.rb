# frozen_string_literal: true

class AddLogidzeToCaseStudyCompanies < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_companies, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_case_study_companies, on: :case_study_companies
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_case_study_companies on case_study_companies;"
      end
    end
  end
end
