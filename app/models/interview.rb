class Interview < ApplicationRecord
  include Airtable::Syncable
  belongs_to :application
  belongs_to :user # An interview is schduled with a specific user (client contact)

  scope :scheduled, -> { where(status: "Call Scheduled" )}
end
