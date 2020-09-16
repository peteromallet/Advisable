class Interview < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :application
  has_one :specialist, through: :application
  has_one :video_call
  belongs_to :user # An interview is schduled with a specific user (client contact)

  scope :scheduled, -> { where(status: 'Call Scheduled') }
end

# == Schema Information
#
# Table name: interviews
#
#  id                                 :bigint           not null, primary key
#  availability_note                  :string
#  call_requested_at                  :datetime
#  call_scheduled_at                  :datetime
#  client_requested_reschedule_at     :datetime
#  more_time_options_added_at         :datetime
#  requested_more_time_options_at     :datetime
#  specialist_requested_reschedule_at :datetime
#  starts_at                          :datetime
#  status                             :string
#  time_zone                          :string
#  uid                                :string
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#  airtable_id                        :string
#  application_id                     :bigint
#  user_id                            :bigint
#  zoom_meeting_id                    :string
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
