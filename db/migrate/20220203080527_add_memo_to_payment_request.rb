# frozen_string_literal: true

class AddMemoToPaymentRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :payment_requests, :memo, :string
  end
end
