# DEPRECATED
# Booking records have been deprecated. A booking is now represented by an
# application record with a status of 'Working'.
class Booking < ApplicationRecord
  include Airtable::Syncable
  validates :status, inclusion: { in: ["Proposal Started", "Proposed", "Offered", "Accepted", "Declined", "Complete"] }, allow_nil: true

  validate :valid_proposal, on: :create

  # disable STI
  self.inheritance_column = :_type_disabled

  has_many :tasks
  belongs_to :application

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

# == Schema Information
#
# Table name: bookings
#
#  id                     :bigint           not null, primary key
#  client_decline_comment :string
#  decline_comment        :string
#  deliverables           :jsonb
#  duration               :string
#  end_date               :date
#  proposal_comment       :string
#  rate                   :decimal(, )
#  rate_limit             :decimal(, )
#  rate_type              :string
#  start_date             :date
#  status                 :string
#  type                   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  airtable_id            :string
#  application_id         :bigint
#  rejection_reason_id    :bigint
#
# Indexes
#
#  index_bookings_on_airtable_id          (airtable_id)
#  index_bookings_on_application_id       (application_id)
#  index_bookings_on_rejection_reason_id  (rejection_reason_id)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#
