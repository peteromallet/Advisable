# frozen_string_literal: true

class AddRemindersToPaymentRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :payment_requests, :reminded_at, :datetime
  end
end
