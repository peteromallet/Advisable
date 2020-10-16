class RemoveCountryFromAccounts < ActiveRecord::Migration[6.0]
  def change
    remove_reference :accounts, :country, foreign_key: true
  end
end
