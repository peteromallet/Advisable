# frozen_string_literal: true

class UnresponsivenessReport < ApplicationRecord
  extend Memoist

  belongs_to :application
  belongs_to :reporter, class_name: "Account"

  memoize def last_message_by_specialist_at
    last_message_by(application.specialist.uid)
  end

  memoize def last_message_by_client_at
    last_message_by(application.project.user.uid)
  end

  private

  def last_message_by(uid)
    messages = TalkjsApi.new.messages(application.uid)
    last_message = messages.find { |m| m["senderId"] == uid }
    Time.zone.at(last_message["createdAt"] / 1000) if last_message
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
