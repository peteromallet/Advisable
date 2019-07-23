class AddProjectPaymentMethodToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :project_payment_method, :string
  end
end
