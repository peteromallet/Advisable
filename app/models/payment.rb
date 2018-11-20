class Payment < ApplicationRecord
  include UID
  belongs_to :project

  after_initialize :set_currency
  after_initialize :set_status, on: :create

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
