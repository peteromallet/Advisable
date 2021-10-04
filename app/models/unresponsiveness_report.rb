# frozen_string_literal: true

class UnresponsivenessReport < ApplicationRecord
  extend Memoist

  belongs_to :application
  belongs_to :reporter, class_name: "Account"

  memoize def last_message_by_specialist_at
    last_message_by(specialist_account)
  end

  memoize def last_message_by_client_at
    last_message_by(user_account)
  end

  private

  def specialist_account
    @specialist_account ||= application.specialist.account
  end

  def user_account
    @user_account ||= application.project.user.account
  end

  def last_message_by(account)
    conversation = Conversation.find_existing_with([user_account, specialist_account])
    messages = conversation&.messages
    return unless messages

    last_message = messages.where(author_id: account.id).order(created_at: :desc).first
    last_message&.created_at
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
#  reporter_id    :bigint           not null
#
# Indexes
#
#  index_unresponsiveness_reports_on_application_id  (application_id)
#  index_unresponsiveness_reports_on_reporter_id     (reporter_id)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#  fk_rails_...  (reporter_id => accounts.id)
#
