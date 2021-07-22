# frozen_string_literal: true

class AddPaymentTypeAndDepositToPayment < ActiveRecord::Migration[6.1]
  def change
    # rubocop:disable Rails/BulkChangeTable
    add_column :payments, :payment_method, :string
    add_column :payments, :deposit, :integer
    # rubocop:enable Rails/BulkChangeTable
  end
end
