class RemoveAccountStatusColumnFromSpecialists < ActiveRecord::Migration[6.0]
  def change
    remove_column :specialists, :account_status, :string
  end
end
