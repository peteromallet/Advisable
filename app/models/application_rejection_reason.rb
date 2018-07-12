class ApplicationRejectionReason < ApplicationRecord
  has_many :applications, foreign_key: 'rejection_reason_id'
  validates :reason, presence: true
  validates :airtable_id, presence: true
end
