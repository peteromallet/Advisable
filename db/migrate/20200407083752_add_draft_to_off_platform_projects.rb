class AddDraftToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :draft, :boolean
  end
end
