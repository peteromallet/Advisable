class AddValidationStatusToOffPlatformProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :off_platform_projects, :validation_status, :string
  end
end
