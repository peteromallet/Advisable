# frozen_string_literal: true

class PaymentRequest < ApplicationRecord
  include Uid
  uid_prefix "pyr"

  has_logidze

  VALID_STATUSES = %w[pending approved past_due disputed canceled paid paid_out].freeze
  APPROVABLE_STATUSES = %w[pending past_due].freeze

  belongs_to :company, optional: true
  belongs_to :specialist, optional: true
  belongs_to :agreement, optional: true

  has_one :payment, dependent: :nullify
  has_one :payout, dependent: :nullify
  has_many :messages, dependent: :destroy

  validates :status, inclusion: {in: VALID_STATUSES}
  before_save :set_due_at

  scope :with_status, ->(status) { where(status:) }
  scope :due, -> { where(due_at: (..Time.current)) }
  scope :unreminded, -> { where(reminded_at: nil) }

  def line_items
    super.presence || []
  end

  # Allows us to override line_items amount if necessary
  def amount
    super.presence || line_items.sum { |item| item["amount"] }
  end

  def financialize!
    return unless amount.to_i.positive?

    create_payout!(specialist:, amount:, status: "pending")
    payment = create_payment!(company:, specialist:, amount:, status: "pending")
    payment.charge!
  end

  def mark_paid!
    update!(status: "paid")
    conversation = Conversation.by_accounts(specialist, agreement.user)
    conversation.new_message!(kind: "PaymentRequestCompleted", payment_request: self, send_emails: false)
  end

  def admin_fee
    return payment.admin_fee if payment.present?

    (amount * company.admin_fee_percentage).round
  end

  def sourcing_fee
    return payout.sourcing_fee if payout.present?

    (amount * specialist.sourcing_fee_percentage).round
  end

  def approvable?
    APPROVABLE_STATUSES.include?(status)
  end

  private

  def set_due_at
    return if due_at.present? || agreement.nil?

    self.due_at = (created_at || Time.current) + agreement.due_days.days
  end
end

# == Schema Information
#
# Table name: payment_requests
#
#  id                  :bigint           not null, primary key
#  amount              :integer
#  cancellation_reason :string
#  dispute_reason      :string
#  due_at              :datetime
#  line_items          :jsonb
#  memo                :string
#  reminded_at         :datetime
#  status              :string           not null
#  uid                 :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  agreement_id        :bigint
#  company_id          :uuid
#  specialist_id       :bigint
#
# Indexes
#
#  index_payment_requests_on_agreement_id   (agreement_id)
#  index_payment_requests_on_company_id     (company_id)
#  index_payment_requests_on_specialist_id  (specialist_id)
#  index_payment_requests_on_uid            (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (agreement_id => agreements.id)
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
