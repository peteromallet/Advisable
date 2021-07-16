# frozen_string_literal: true

class AddLogidzeToPayments < ActiveRecord::Migration[6.1]
  def change
    add_column :payments, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_payments, on: :payments
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_payments on payments;"
      end
    end
  end
end
