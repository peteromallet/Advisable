class AddEstimatedBudgetToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :estimated_budget, :string
  end
end
