class AddConfirmationTokenToAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :confirmation_token, :string
    add_column :users, :confirmation_token, :string
  end
end
