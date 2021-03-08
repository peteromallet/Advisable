# frozen_string_literal: true

class RemoveVatNumberFromAccounts < ActiveRecord::Migration[6.1]
  def change
    safety_assured { remove_column :accounts, :vat_number, :string }
  end
end
