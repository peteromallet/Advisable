# Charges a given payment record
class Payments::Charge < ApplicationService
  attr_reader :payment

  def initialize(payment)
    @payment = payment
  end

  def call
    begin
    charge = Stripe::Charge.create({
      amount: payment.amount,
      currency: payment.currency,
      source: payment.source_id
    }, {
      idempotency_key: payment.uid
    })

    payment.update_attributes(charge_id: charge.id, status: 'captured')

    rescue Stripe::StripeError => e
      payment.update_attributes(status: 'failed', error_code: e.code)
    end

    payment
  end
end