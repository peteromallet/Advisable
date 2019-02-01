class AddValidtedByClientToOffPlatformProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :off_platform_projects, :validated_by_client, :boolean
  end
end
