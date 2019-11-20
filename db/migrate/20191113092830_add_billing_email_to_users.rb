class AddBillingEmailToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :billing_email, :string
  end
end
