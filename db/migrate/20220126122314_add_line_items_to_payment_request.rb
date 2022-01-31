# frozen_string_literal: true

class AddLineItemsToPaymentRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :payment_requests, :line_items, :jsonb
  end
end
