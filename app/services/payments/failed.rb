# Marks a given payment as failed with an error_code
class Payments::Failed < ApplicationService
  attr_reader :payment, :error_code

  def initialize(payment, error_code)
    @payment = payment
    @error_code = error_code
  end

  def call
    if payment.status != 'pending'
      raise Service::Error.new("Payment is not pending")
    end

    payment.update_attributes(status: 'failed', error_code: error_code)
    payment
  end
end