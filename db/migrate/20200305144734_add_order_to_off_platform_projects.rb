class AddOrderToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :priority, :integer
  end
end
