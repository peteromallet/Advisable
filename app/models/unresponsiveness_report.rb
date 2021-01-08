# frozen_string_literal: true

class UnresponsivenessReport < ApplicationRecord
  extend Memoist

  belongs_to :application
  belongs_to :user

  memoize def last_message_at
    messages = TalkjsApi.new.messages(application.uid)
    specialist_message = messages.find { |m| m["senderId"] == application.specialist.uid }
    Time.zone.at(specialist_message["createdAt"] / 1000) if specialist_message
  rescue ApiRequestError
    nil
  end
end

# == Schema Information
#
# Table name: unresponsiveness_reports
#
#  id             :uuid             not null, primary key
#  message        :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  application_id :bigint           not null
#  user_id        :bigint           not null
#
# Indexes
#
#  index_unresponsiveness_reports_on_application_id  (application_id)
#  index_unresponsiveness_reports_on_user_id         (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#  fk_rails_...  (user_id => users.id)
#
