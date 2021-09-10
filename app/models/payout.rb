# frozen_string_literal: true

class Payout < ApplicationRecord
  include Uid
  uid_prefix "pyo"

  has_logidze

  belongs_to :specialist
  belongs_to :task, optional: true

  before_create :set_sourcing_fee

  validates :amount, presence: true

  scope :with_status, ->(status) { where(status: status) }
  scope :unprocessed, -> { where(processed_at: nil) }

  def amount_without_fee
    amount - sourcing_fee
  end

  def vat_rate
    specialist.vat_number&.starts_with?("IE") ? 0.23 : 0.0
  end

  def vat_amount
    amount_without_fee * vat_rate
  end

  def gross_amount
    amount_without_fee + vat_amount
  end

  private

  def set_sourcing_fee
    return if sourcing_fee.present?

    self.sourcing_fee = (amount * specialist.sourcing_fee_percentage).round
  end
end

# == Schema Information
#
# Table name: payouts
#
#  id            :bigint           not null, primary key
#  amount        :integer
#  processed_at  :datetime
#  sourcing_fee  :integer
#  status        :string
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  specialist_id :bigint           not null
#  task_id       :bigint
#
# Indexes
#
#  index_payouts_on_specialist_id  (specialist_id)
#  index_payouts_on_task_id        (task_id)
#  index_payouts_on_uid            (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (task_id => tasks.id)
#
