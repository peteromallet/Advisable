class Booking < ApplicationRecord
  validates :airtable_id, presence: true
  validates :status, inclusion: { in: %w(Offered Accepted Declined Complete) }

  # disable STI
  self.inheritance_column = :_type_disabled

  belongs_to :application
  belongs_to :rejection_reason, required: false, class_name: "BookingRejectionReason"
  after_initialize :set_status, if: :new_record?

  serialize :deliverables, Array

  private

  def set_status
    self.status = "Offered"
  end
end
