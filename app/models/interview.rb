class Interview < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :application
  has_one :specialist, through: :application
  belongs_to :user # An interview is schduled with a specific user (client contact)

  scope :scheduled, -> { where(status: 'Call Scheduled') }
end
