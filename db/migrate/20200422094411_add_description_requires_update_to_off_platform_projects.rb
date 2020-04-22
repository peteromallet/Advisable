class AddDescriptionRequiresUpdateToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :description_requires_update, :boolean
  end
end
