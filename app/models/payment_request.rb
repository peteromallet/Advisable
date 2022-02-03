# frozen_string_literal: true

class PaymentRequest < ApplicationRecord
  include Uid
  uid_prefix "pyr"

  DUE_AT_DURATION = 5.days

  has_logidze

  VALID_STATUSES = %w[pending approved disputed canceled paid paid_out].freeze

  belongs_to :company, optional: true
  belongs_to :specialist, optional: true

  has_one :payment, dependent: :nullify
  has_one :payout, dependent: :nullify

  validates :status, inclusion: {in: VALID_STATUSES}

  before_validation :set_due_at, on: :create

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

  private

  def set_due_at
    self.due_at = Time.current + DUE_AT_DURATION
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
#  status              :string           not null
#  uid                 :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  company_id          :uuid
#  specialist_id       :bigint
#
# Indexes
#
#  index_payment_requests_on_company_id     (company_id)
#  index_payment_requests_on_specialist_id  (specialist_id)
#  index_payment_requests_on_uid            (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
