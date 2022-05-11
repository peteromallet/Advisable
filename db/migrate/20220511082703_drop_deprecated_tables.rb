# frozen_string_literal: true

class DropDeprecatedTables < ActiveRecord::Migration[7.0]
  def up
    drop_table :tasks
    drop_table :problematic_flags
    drop_table :project_industries
    drop_table :project_skills
    drop_table :unresponsiveness_reports
    drop_table :applications
    drop_table :projects
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
