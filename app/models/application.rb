class Application < ApplicationRecord
  belongs_to :specialist
  belongs_to :project
  has_many :bookings
  has_many :interviews
  has_one :proposal, -> { where(status: "Proposed") }, class_name: "Booking"
  validates :airtable_id, presence: true

  scope :accepted_fees, -> { where(accepts_fee: true) }
  scope :accepted_terms, -> { where(accepts_terms: true) }
  scope :successful, -> {
    joins(:bookings).where(bookings: { status: ["Complete", "Accepted"] })
  }

  def questions
    self[:questions] || []
  end
end
