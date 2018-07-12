class BookingRejectionReason < ApplicationRecord
  has_many :bookings, foreign_key: 'rejection_reason_id'
  validates :name, presence: true
  validates :airtable_id, presence: true
end
