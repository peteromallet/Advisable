# frozen_string_literal: true

class AddDisputeReasonToPaymentRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :payment_requests, :dispute_reason, :string
  end
end
