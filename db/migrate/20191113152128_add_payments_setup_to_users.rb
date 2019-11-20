class AddPaymentsSetupToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :payments_setup, :boolean, default: false
  end
end
