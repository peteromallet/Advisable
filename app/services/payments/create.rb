# Service object for creating a payment
# The returned payment record will have a status of 'charged', 'failed', or 'pending'.
class Payments::Create < ApplicationService
  attr_reader :project, :source, :payment
  
  def initialize(project:, amount:, source_id:)
    @project = project
    @source = Stripe::Source.retrieve(source_id)
    @payment = Payment.new(project: project, amount: amount, source_id: source_id)
  end

  # Check the status of the stripe source. If the status is chargeable then we can
  # immediately charge the source. If the source has been canceled, failed or consumed
  # then we mark the payment as failed. For anything else the payment status will remain
  # pending and will be processed via stripe webhooks
  def call
    check_payment_amount

    case source.status
    when "chargeable"
      Payments::Charge.call(payment)
    when "canceled", "failed", "consumed"
      Payments::Failed.call(payment, "source_not_chargeable")
    end

    payment
  end

  private

  def check_payment_amount
    if payment.amount > project.deposit_owed
      raise Service::Error.new("Payment amount exceeds deposit amount")
    end
  end
end