class AddFinalCostToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :final_cost, :integer
  end
end
