class ChangeTaskEstimateToInteger < ActiveRecord::Migration[6.0]
  def change
    change_column :tasks, :estimate, :integer
  end
end
