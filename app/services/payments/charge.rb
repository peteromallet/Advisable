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
      source: payment.source_id,
      receipt_email: payment.project.user.email,
      metadata: {
        name: payment.project.user.name,
        project_airtable_id: payment.project.airtable_id
      }
    }, {
      idempotency_key: payment.uid
    })

    payment.update_attributes(charge_id: charge.id, status: 'captured')
    update_project_deposit_paid(payment)

    rescue Stripe::StripeError => e
      payment.update_attributes(status: 'failed', error_code: e.code)
    end

    payment
  end

  private

  def update_project_deposit_paid(payment)
    project = payment.project
    paid = [project.deposit_paid + payment.amount, project.deposit].max
    project.update_columns(deposit_paid: paid)
    airtable_record = Airtable::Project.find(project.airtable_id)
    airtable_record['Deposit Amount Paid'] = paid / 100.0
    airtable_record.save
  end
end