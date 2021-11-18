# frozen_string_literal: true

class RemoveBankTransfersEnabledFromCompany < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :companies, :bank_transfers_enabled, :boolean
    end
  end
end
