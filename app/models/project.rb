class Project < ApplicationRecord
  has_many :applications
  has_many :payments
  belongs_to :client
  validates :name, presence: true
  validates :airtable_id, presence: true

  def accepted_terms=(accepted)
    self.accepted_terms_at = DateTime.now.utc if !accepted_terms && accepted
    self.accepted_terms_at = nil if accepted_terms && !accepted
  end

  def accepted_terms
    accepted_terms_at.present?
  end

  def deposit
    self[:deposit] || 0
  end

  # returns the amount of the deposit that is left to be paid
  def deposit_owed
    [deposit - payments.captured.sum(:amount), 0].max
  end
end
