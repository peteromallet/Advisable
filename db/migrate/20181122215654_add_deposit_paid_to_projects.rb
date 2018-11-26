class AddDepositPaidToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :deposit_paid, :integer
  end
end
