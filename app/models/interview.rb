class Interview < ApplicationRecord
  include Airtable::Syncable
  belongs_to :application
  has_one :specialist, through: :application

  # An interview is scheduled with a specific user (client contact)
  belongs_to :user

  # TODO: Add a list of valid statuses
  # Don't use `enum` for now, since it brings validations and co&...
  STATUSES = {
    scheduled: 'Call Scheduled'
  }

  scope :scheduled, -> { where(status: STATUSES[:scheduled]) }
end
