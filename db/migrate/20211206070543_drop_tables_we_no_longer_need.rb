class DropTablesWeNoLongerNeed < ActiveRecord::Migration[6.1]
  def change
    drop_table :application_references
    drop_table :off_platform_projects
  end
end
