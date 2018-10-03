class Booking < ApplicationRecord
  validates :airtable_id, presence: true
  validates :status, inclusion: { in: %w(Proposed Offered Accepted Declined Complete) }, allow_nil: true

  validate :valid_proposal, on: :create

  # disable STI
  self.inheritance_column = :_type_disabled

  belongs_to :application
  belongs_to :rejection_reason, required: false, class_name: "BookingRejectionReason"

  serialize :deliverables, Array

  scope :proposals, -> { where(status: 'Proposed') }

  # Wether or not the booking is recurring
  def recurring?
    type == 'Recurring'
  end

  # Calculates the end date for a recurring booking based on its duration.
  # This method is not automatically called when a booking is updated and
  # must explicitly be called. This is to prevent any issues when syncing
  # data from airtable.
  def calculate_end_date
    return unless recurring? && start_date
    # Parse the duration to an int.
    # "Until Cancellation" has no numbers so will be parsed as 0.
    # "3 Months" will be parsed as 3.
    number_of_months = duration.to_i
    if number_of_months == 0
      self.end_date = nil
    else
      self.end_date = start_date >> number_of_months
    end
  end

  private

  # Validates that a proposal does not already exist for the application record
  def valid_proposal
    return if application.nil?
    return if application.bookings.proposals.empty?
    errors.add(:application, 'This application already has a proposal')
  end
end
