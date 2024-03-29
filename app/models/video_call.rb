# frozen_string_literal: true

class VideoCall < ApplicationRecord
  include Uid

  belongs_to :interview, optional: true
end

# == Schema Information
#
# Table name: video_calls
#
#  id              :bigint           not null, primary key
#  fallback        :boolean
#  uid             :string           not null
#  zoom_passcode   :string
#  zoom_url        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  interview_id    :bigint
#  zoom_meeting_id :string
#
# Indexes
#
#  index_video_calls_on_interview_id  (interview_id)
#  index_video_calls_on_uid           (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (interview_id => interviews.id)
#
