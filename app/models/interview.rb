class Interview < ApplicationRecord
  include Airtable::Syncable
  belongs_to :application
  has_one :specialist, through: :application
  belongs_to :user # An interview is schduled with a specific user (client contact)

  # TODO: Add a list of valid statuses
  enum status: { scheduled: 'Call Scheduled' }

  scope :scheduled, -> { where(status: statuses[:schduled]) }
end
