# frozen_string_literal: true

class AddSearchToCaseStudySkills < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :case_study_skills, :search, foreign_key: {to_table: :case_study_searches}
      change_column_null :case_study_skills, :article_id, true
    end
  end
end
