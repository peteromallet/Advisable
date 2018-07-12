class ApplicationRejectionReason < ApplicationRecord
  has_many :applications
  validates :reason, presence: true
  validates :airtable_id, presence: true
end
