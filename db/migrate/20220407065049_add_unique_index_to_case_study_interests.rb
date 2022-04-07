# frozen_string_literal: true

class AddUniqueIndexToCaseStudyInterests < ActiveRecord::Migration[7.0]
  def up
    change_column :case_study_interests, :term, :citext
    add_index :case_study_interests, %w[term account_id], unique: true
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
