# frozen_string_literal: true

class UpdateCompanysPaymentMethodJob < ApplicationJob
  queue_as :default

  def perform(company, payment_method_id)
    stripe_customer_id = company.stripe_customer_id

    existing = Stripe::PaymentMethod.list(customer: stripe_customer_id, type: "card")
    unless existing.data.map(&:id).include?(payment_method_id)
      # Attach the payment method to the customer
      Stripe::PaymentMethod.attach(payment_method_id, {customer: stripe_customer_id})
    end

    Stripe::Customer.update(stripe_customer_id, {invoice_settings: {default_payment_method: payment_method_id}})

    company.update(stripe_payment_method: payment_method_id)
  end
end
