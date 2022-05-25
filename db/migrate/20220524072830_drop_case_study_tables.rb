# frozen_string_literal: true

class DropCaseStudyTables < ActiveRecord::Migration[7.0]
  def up
    remove_column :case_study_skills, :search_id
    drop_table :case_study_archived_articles
    drop_table :case_study_search_feedbacks
    drop_table :case_study_searches
    drop_table :consultations
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
