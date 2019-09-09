class AddAccountStatusToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :account_status, :string
  end
end
