# frozen_string_literal: true

class AddLogidzeToPaymentRequests < ActiveRecord::Migration[7.0]
  def change
    add_column :payment_requests, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_payment_requests, on: :payment_requests
      end

      dir.down do
        execute <<~SQL
          DROP TRIGGER IF EXISTS "logidze_on_payment_requests" on "payment_requests";
        SQL
      end
    end
  end
end
