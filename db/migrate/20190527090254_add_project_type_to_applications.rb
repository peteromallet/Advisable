class AddProjectTypeToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :project_type, :string
  end
end
