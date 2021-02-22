# frozen_string_literal: true

class AddDisabledAtToAccounts < ActiveRecord::Migration[6.1]
  def change
    add_column :accounts, :disabled_at, :timestamp
  end
end
