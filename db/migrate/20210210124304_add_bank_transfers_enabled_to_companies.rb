# frozen_string_literal: true

class AddBankTransfersEnabledToCompanies < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :bank_transfers_enabled, :boolean, default: false
  end
end
