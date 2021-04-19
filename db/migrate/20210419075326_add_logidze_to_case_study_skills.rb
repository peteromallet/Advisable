# frozen_string_literal: true

class AddLogidzeToCaseStudySkills < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_skills, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_case_study_skills, on: :case_study_skills
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_case_study_skills on case_study_skills;"
      end
    end
  end
end
