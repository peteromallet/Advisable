# frozen_string_literal: true

class Payment < ApplicationRecord
  self.ignored_columns += %i[task_id]

  include Uid

  has_logidze

  URL_EXPIRES_AT = 1.hour.to_i
  VALID_STATUSES = %w[requires_payment_method requires_confirmation requires_action processing requires_capture canceled succeeded failed pending refunded].freeze
  VALID_PAYMENT_METHODS = ["Bank Transfer", "Stripe"].freeze

  belongs_to :company
  belongs_to :specialist
  belongs_to :payment_request, optional: true

  before_create :set_admin_fee

  validates :amount, presence: true
  validates :status, inclusion: {in: VALID_STATUSES}, allow_nil: true
  validates :payment_method, inclusion: {in: VALID_PAYMENT_METHODS}, allow_nil: true

  scope :with_status, ->(status) { where(status:) }

  def retries
    super.presence || 0
  end

  def total
    amount + admin_fee
  end

  def total_with_vat
    total + vat_amount
  end

  def vat_amount
    (total * vat_rate).round
  end

  def vat_rate
    company.apply_vat? ? 0.23 : 0.0
  end

  def paid?
    status == "succeeded"
  end

  def pdf_url(regenerate: false)
    self.pdf_key = nil if regenerate
    GeneratePaymentInvoiceJob.perform_now(self) if pdf_key.blank?
    obj = Aws::S3::Object.new(bucket_name: ENV.fetch("AWS_S3_BUCKET", nil), key: pdf_key)
    obj.presigned_url(:get, expires_in: URL_EXPIRES_AT)
  end

  def mark_paid!
    if payment_request
      payment_request.update!(status: "paid")
    else
      UserMailer.payment_receipt(self).deliver_later
    end
  end

  def charge!
    return self if paid? || !total.positive?

    GeneratePaymentInvoiceJob.perform_later(self, notify: true) if payment_request.present? && pdf_key.blank?

    if company.project_payment_method == "Bank Transfer"
      update!(payment_method: "Bank Transfer")
      Slack.bg_message(channel: "payments", text: "New Bank Transfer for *#{company&.name}* (#{company_id}) with *#{specialist&.account&.name}* (#{specialist&.uid})!\nPayment: #{uid}\nPayment Request: #{payment_request&.uid || "none"}")
    elsif company.stripe_payment_method.blank?
      create_intent_without_payment_method!
    elsif payment_intent_id.blank?
      intent = Stripe::PaymentIntent.create(
        stripe_params.merge({confirm: true, off_session: true, payment_method: company.stripe_payment_method}),
        {idempotency_key: "#{uid}_off_session_#{retries}"}
      )
      update!(payment_intent_id: intent.id, status: intent.status, payment_method: "Stripe")

      if intent.status == "succeeded"
        mark_paid!
      else
        Slack.bg_message(
          channel: "payments",
          text: "Payment for *#{company&.name}* (#{company_id}) with *#{specialist&.account&.name}* (#{specialist&.uid}) was not successful! Payment: #{uid}"
        )
      end
    end

    self
  rescue Stripe::StripeError => e
    update!(status: "failed", payment_intent_id: e.json_body.dig(:error, :payment_intent, :id))
    Sentry.capture_exception(e, extra: {stripe_error: e.json_body[:error]}, level: "info")
    text = [
      "Something went wrong with the payment for *#{company&.name}* (#{company_id}) with *#{specialist&.account&.name}* (#{specialist&.uid})!",
      "Payment: #{uid}",
      "Stripe Payment Intent ID: #{payment_intent_id}",
      "Error: #{e.message}"
    ].compact.join("\n")
    Slack.bg_message(channel: "payments", text:)
    create_intent_without_payment_method!
    self
  end

  def refund!
    Stripe::Refund.create({payment_intent: payment_intent_id, metadata: {payment_type: "payment", payment: uid}})
  rescue Stripe::StripeError => e
    Sentry.capture_exception(e, extra: {stripe_error: e.json_body[:error]})
    text = [
      "Something went wrong with refundment of payment for *#{company&.name}* (#{company_id}) with *#{specialist&.account&.name}* (#{specialist&.uid})!",
      "Payment: #{uid}",
      "Stripe Payment Intent ID: #{payment_intent_id}",
      "Error: #{e.message}"
    ]
    Slack.bg_message(channel: "payments", text:)
    self
  end

  private

  def create_intent_without_payment_method!
    return if payment_intent_id.present?

    intent = Stripe::PaymentIntent.create(
      stripe_params.merge({setup_future_usage: "off_session"}),
      {idempotency_key: "#{uid}_on_session_#{retries}"}
    )
    update!(payment_intent_id: intent.id, status: intent.status, payment_method: "Stripe")
  rescue Stripe::StripeError => e
    Sentry.capture_exception(e, extra: {stripe_error: e.json_body[:error]})
  end

  def stripe_params
    {
      amount: total_with_vat,
      currency: "usd",
      customer: company.stripe_customer_id,
      metadata: {
        payment_type: "payment",
        payment: uid,
        admin_fee:
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
#  id                 :bigint           not null, primary key
#  admin_fee          :integer
#  amount             :integer
#  charged_at         :datetime
#  payment_method     :string
#  pdf_key            :string
#  retries            :integer
#  status             :string
#  uid                :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  company_id         :uuid             not null
#  payment_intent_id  :string
#  payment_request_id :bigint
#  specialist_id      :bigint           not null
#
# Indexes
#
#  index_payments_on_company_id          (company_id)
#  index_payments_on_payment_request_id  (payment_request_id)
#  index_payments_on_specialist_id       (specialist_id)
#  index_payments_on_task_id             (task_id)
#  index_payments_on_uid                 (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (payment_request_id => payment_requests.id)
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (task_id => tasks.id)
#
