# frozen_string_literal: true

class RemoveBankTransfersEnabledFromUser < ActiveRecord::Migration[6.1]
  def change
    safety_assured { remove_column :users, :bank_transfers_enabled, :boolean }
  end
end
