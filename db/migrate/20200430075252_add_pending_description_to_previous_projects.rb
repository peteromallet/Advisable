class AddPendingDescriptionToPreviousProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :pending_description, :string
  end
end
