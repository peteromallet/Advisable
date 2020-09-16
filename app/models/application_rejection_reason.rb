class ApplicationRejectionReason < ApplicationRecord
  has_many :applications, foreign_key: 'rejection_reason_id'
  validates :reason, presence: true
  validates :airtable_id, presence: true
end

# == Schema Information
#
# Table name: application_rejection_reasons
#
#  id          :bigint           not null, primary key
#  reason      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  airtable_id :string
#
# Indexes
#
#  index_application_rejection_reasons_on_airtable_id  (airtable_id)
#
