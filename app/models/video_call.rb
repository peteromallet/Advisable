# frozen_string_literal: true

class VideoCall < ApplicationRecord
  include Uid

  belongs_to :interview, optional: true
end

# == Schema Information
#
# Table name: video_calls
#
#  id              :integer          not null, primary key
#  uid             :string           not null
#  interview_id    :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  fallback        :boolean
#  zoom_meeting_id :string
#  zoom_passcode   :string
#  zoom_url        :string
#
# Indexes
#
#  index_video_calls_on_interview_id  (interview_id)
#  index_video_calls_on_uid           (uid) UNIQUE
#
