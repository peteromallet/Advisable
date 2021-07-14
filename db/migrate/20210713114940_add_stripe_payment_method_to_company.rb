# frozen_string_literal: true

class AddStripePaymentMethodToCompany < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :stripe_payment_method, :string
  end
end
