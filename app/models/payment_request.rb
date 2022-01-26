# frozen_string_literal: true

class PaymentRequest < ApplicationRecord
  include Uid
  uid_prefix "pyr"

  has_logidze

  VALID_STATUSES = %w[pending approved paid disputed completed].freeze

  belongs_to :company
  belongs_to :specialist

  has_one :payment, dependent: :nullify
  has_one :payout, dependent: :nullify

  validates :status, inclusion: {in: VALID_STATUSES}

  def line_items
    super.presence || []
  end

  # Allows us to overwrite line_items amount if necessary
  def amount
    super.presence || line_items.sum { |item| item["amount"] }
  end

  # TODO: Add specs
  def financialize!
    return unless amount.to_i.positive?

    Payout.create!(specialist:, payment_request: self, amount:, status: "pending")
    payment = Payment.create!(company:, specialist:, amount:, payment_request: self, status: "pending")
    payment.charge!
  end
end

# == Schema Information
#
# Table name: payment_requests
#
#  id            :bigint           not null, primary key
#  amount        :integer
#  line_items    :jsonb
#  status        :string           not null
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  company_id    :uuid             not null
#  specialist_id :bigint           not null
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
