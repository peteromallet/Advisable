# frozen_string_literal: true

class Payment < ApplicationRecord
  include Uid
  uid_prefix "pay"

  belongs_to :company
  belongs_to :specialist
  belongs_to :task, optional: true

  before_create :set_admin_fee

  validates :amount, presence: true

  def create_in_stripe!
    if payment_intent_id.blank?
      intent = Stripe::PaymentIntent.create(
        amount: amount_with_fee,
        currency: "usd",
        customer: company.stripe_customer_id,
        confirm: true,
        off_session: true,
        metadata: {admin_fee: admin_fee}
      )
      update(payment_intent_id: intent.id, status: intent.status)
    end

    payment_intent_id
  rescue Stripe::InvalidRequestError => e
    Slack.message(channel: "client_engagement", text: "Something went wrong with the payment for *#{company.name}* (#{company_id}) with *#{specialist.account.name}* (#{specialist.uid})! Payment: #{uid}")
    Sentry.capture_exception(e, extra: {stripe_error: e.json_body[:error]})
  end

  def amount_with_fee
    amount + admin_fee
  end

  private

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
