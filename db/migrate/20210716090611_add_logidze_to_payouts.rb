# frozen_string_literal: true

class AddLogidzeToPayouts < ActiveRecord::Migration[6.1]
  def change
    add_column :payouts, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_payouts, on: :payouts
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_payouts on payouts;"
      end
    end
  end
end
