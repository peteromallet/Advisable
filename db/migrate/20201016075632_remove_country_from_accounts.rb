class RemoveCountryFromAccounts < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      remove_reference :accounts, :country, foreign_key: true
    end
  end
end
