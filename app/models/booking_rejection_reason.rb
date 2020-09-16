class BookingRejectionReason < ApplicationRecord
  has_many :bookings, foreign_key: 'rejection_reason_id'
  validates :name, presence: true
  validates :airtable_id, presence: true
end

# == Schema Information
#
# Table name: booking_rejection_reasons
#
#  id          :bigint           not null, primary key
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  airtable_id :string
#
# Indexes
#
#  index_booking_rejection_reasons_on_airtable_id  (airtable_id)
#
