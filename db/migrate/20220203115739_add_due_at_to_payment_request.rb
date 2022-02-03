# frozen_string_literal: true

class AddDueAtToPaymentRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :payment_requests, :due_at, :datetime
  end
end
