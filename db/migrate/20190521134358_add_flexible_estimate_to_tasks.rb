class AddFlexibleEstimateToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :flexible_estimate, :int
  end
end
