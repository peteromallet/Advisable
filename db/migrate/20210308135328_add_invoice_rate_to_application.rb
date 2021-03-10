# frozen_string_literal: true

class AddInvoiceRateToApplication < ActiveRecord::Migration[6.1]
  def change
    add_column :applications, :invoice_rate, :integer
  end
end
