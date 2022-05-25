# frozen_string_literal: true

class AddPaymentRequestToMessage < ActiveRecord::Migration[7.0]
  def change
    add_reference :messages, :payment_request, null: true, foreign_key: true
  end
end
