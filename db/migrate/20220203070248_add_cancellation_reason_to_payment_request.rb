# frozen_string_literal: true

class AddCancellationReasonToPaymentRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :payment_requests, :cancellation_reason, :string
  end
end
