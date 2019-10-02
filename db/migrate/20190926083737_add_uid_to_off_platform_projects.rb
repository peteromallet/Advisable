class AddUidToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :uid, :string, index: true
  end
end
