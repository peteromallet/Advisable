# frozen_string_literal: true

class RemoveDepositFromPayment < ActiveRecord::Migration[7.0]
  def change
    remove_column :payments, :deposit, :integer
  end
end
