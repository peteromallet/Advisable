class AddAdditionalFieldsToPreviousProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :industry_relevance, :integer
    add_column :off_platform_projects, :location_relevance, :integer
    add_column :off_platform_projects, :cost_to_hire, :integer
    add_column :off_platform_projects, :execution_cost, :integer
  end
end
