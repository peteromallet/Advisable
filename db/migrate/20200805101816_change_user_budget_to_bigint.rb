class ChangeUserBudgetToBigint < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :budget, :bigint
  end
end
