class BookingRejectionReason < ApplicationRecord
  has_many :bookings
  validates :name, presence: true
  validates :airtable_id, presence: true
end
