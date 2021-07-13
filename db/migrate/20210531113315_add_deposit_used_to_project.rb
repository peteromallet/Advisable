# frozen_string_literal: true

class AddDepositUsedToProject < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :deposit_used, :integer
  end
end
