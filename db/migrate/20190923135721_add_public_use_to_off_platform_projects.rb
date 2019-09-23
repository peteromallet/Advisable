class AddPublicUseToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :public_use, :boolean
  end
end
