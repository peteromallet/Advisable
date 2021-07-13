# frozen_string_literal: true

class Payment < ApplicationRecord
  include Uid

  VALID_STATUSES = %w[requires_payment_method requires_confirmation requires_action processing requires_capture canceled succeeded failed pending].freeze

  belongs_to :company
  belongs_to :specialist
  belongs_to :task, optional: true

  before_create :set_admin_fee

  validates :amount, presence: true
  validates :status, inclusion: {in: VALID_STATUSES}, allow_nil: true

  scope :with_status, ->(status) { where(status: status) }

  def amount_with_fee
    amount + admin_fee
  end

  def create_in_stripe!
    if payment_intent_id.blank?
      intent = Stripe::PaymentIntent.create(
        stripe_params.merge({confirm: true, off_session: true}),
        {idempotency_key: "#{uid}_off_session"}
      )
      update!(payment_intent_id: intent.id, status: intent.status)
    end

    payment_intent_id
  rescue Stripe::StripeError => e
    update!(status: "failed")
    Sentry.capture_exception(e, extra: {stripe_error: e.json_body[:error]})
    Slack.message(channel: "client_engagement", text: "Something went wrong with the payment for *#{company.name}* (#{company_id}) with *#{specialist.account.name}* (#{specialist.uid})! Payment: #{uid}")
    create_on_session_intent!
    payment_intent_id
  end

  private

  def create_on_session_intent!
    return if payment_intent_id.present?

    intent = Stripe::PaymentIntent.create(
      stripe_params.merge({setup_future_usage: "off_session"}),
      {idempotency_key: "#{uid}_on_session"}
    )
    update!(payment_intent_id: intent.id, status: intent.status)
  rescue Stripe::StripeError => e
    Sentry.capture_exception(e, extra: {stripe_error: e.json_body[:error]})
  end

  def stripe_params
    {
      amount: amount_with_fee,
      currency: "usd",
      customer: company.stripe_customer_id,
      metadata: {
        payment_type: "payment",
        payment: uid,
        admin_fee: admin_fee
      }
    }
  end

  def set_admin_fee
    return if admin_fee.present?

    self.admin_fee = (amount * company.admin_fee_percentage).round
  end
end

# == Schema Information
#
# Table name: payments
#
#  id                :bigint           not null, primary key
#  admin_fee         :integer
#  amount            :integer
#  status            :string
#  uid               :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  company_id        :uuid             not null
#  payment_intent_id :string
#  specialist_id     :bigint           not null
#  task_id           :bigint
#
# Indexes
#
#  index_payments_on_company_id     (company_id)
#  index_payments_on_specialist_id  (specialist_id)
#  index_payments_on_task_id        (task_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (task_id => tasks.id)
#
