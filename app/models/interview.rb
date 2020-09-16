class Interview < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :application
  has_one :specialist, through: :application
  belongs_to :user # An interview is schduled with a specific user (client contact)

  scope :scheduled, -> { where(status: 'Call Scheduled') }
end

# == Schema Information
#
# Table name: interviews
#
#  id                :bigint           not null, primary key
#  availability_note :string
#  starts_at         :datetime
#  status            :string
#  time_zone         :string
#  uid               :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  airtable_id       :string
#  application_id    :bigint
#  user_id           :bigint
#  zoom_meeting_id   :string
#
# Indexes
#
#  index_interviews_on_airtable_id     (airtable_id)
#  index_interviews_on_application_id  (application_id)
#  index_interviews_on_user_id         (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#  fk_rails_...  (user_id => users.id)
#
