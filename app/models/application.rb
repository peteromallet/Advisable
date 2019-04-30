class Application < ApplicationRecord
  include Airtable::Syncable
  belongs_to :specialist
  belongs_to :project
  has_many :bookings
  has_many :interviews
  has_many :tasks
  has_many :references, class_name: "ApplicationReference"
  has_one :interview
  has_one :proposal, -> { where(status: "Proposed") }, class_name: "Booking"
  has_one :offer, -> { where(status: ["Offered", "Declined", "Accepted", "Complete"]) }, class_name: "Booking"
  validates :airtable_id, presence: true

  scope :accepted_fees, -> { where(accepts_fee: true) }
  scope :accepted_terms, -> { where(accepts_terms: true) }

  def questions
    self[:questions] || []
  end
end
