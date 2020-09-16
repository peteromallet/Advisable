class Payment < ApplicationRecord
  include Uid
  belongs_to :project

  after_initialize :set_currency
  after_initialize :set_status

  scope :captured, -> { where(status: "captured") }

  def pending?
    status == "pending"
  end

  private

  def set_currency
    self.currency = "usd" unless currency.present?
  end

  def set_status
    self.status = 'pending' unless status.present?
  end
end

# == Schema Information
#
# Table name: payments
#
#  id         :bigint           not null, primary key
#  amount     :integer
#  currency   :string
#  error_code :string
#  status     :string
#  uid        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  charge_id  :string
#  project_id :bigint
#  source_id  :string
#
# Indexes
#
#  index_payments_on_charge_id   (charge_id)
#  index_payments_on_project_id  (project_id)
#  index_payments_on_source_id   (source_id)
#  index_payments_on_uid         (uid)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#
