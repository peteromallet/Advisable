# frozen_string_literal: true

class Interview < ApplicationRecord
  include Uid

  has_logidze

  VALID_STATUSES = [
    "Call Scheduled", "Call Completed", "Call Requested", "Need More Time Options",
    "More Time Options Added", "Specialist Requested Reschedule", "Client Requested Reschedule"
  ].freeze

  belongs_to :application
  belongs_to :user # An interview is scheduled with a specific user (client contact)
  has_one :specialist, through: :application
  has_one :video_call, dependent: :destroy

  scope :scheduled, -> { where(status: "Call Scheduled") }

  validates :status, inclusion: {in: VALID_STATUSES}

  def create_system_message!
    conversation = Conversation.by_accounts([specialist.account, user.account])
    conversation.new_message!(nil, "#{specialist.account.name} & #{user.account.name},\n\nNow that you've scheduled a call, you can use this thread to communicate.\n\nIf you have any questions or issues, don't hesitate to contact the Advisable team at hello@advisable.com.")
  end

  def create_google_calendar_event
    provider = AuthProvider.robot_calendar_provider
    return unless provider.is_a?(AuthProvider)

    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = provider.google_secret.to_authorization
    description = <<~DESCRIPTION.strip
      You can use the following link for you call: #{ApplicationMailer.default_url_options[:host]}/calls/#{video_call.uid}.\n
      Please sign in to your Advisable account to join this call.\n
      If you'd like to reschedule, please email #{user.company.sales_person.name} at #{user.company.sales_person.email}.
    DESCRIPTION
    ends_at = starts_at + 30.minutes
    event = Google::Apis::CalendarV3::Event.new(
      start: Google::Apis::CalendarV3::EventDateTime.new(date_time: starts_at.rfc3339, time_zone: starts_at.time_zone.tzinfo.name),
      end: Google::Apis::CalendarV3::EventDateTime.new(date_time: ends_at.rfc3339, time_zone: starts_at.time_zone.tzinfo.name),
      location: "#{ApplicationMailer.default_url_options[:host]}/calls/#{video_call.uid}",
      reminders: Google::Apis::CalendarV3::Event::Reminders.new(use_default: true),
      summary: "Call with #{user.name_with_company} and #{specialist.account.name} about #{application.project.nice_name} Project",
      description: description,
      attendees: [
        Google::Apis::CalendarV3::EventAttendee.new(email: user.account.email),
        Google::Apis::CalendarV3::EventAttendee.new(email: specialist.account.email)
      ]
    )
    service.insert_event(ENV["GOOGLE_INTERVIEW_CALENDAR_ID"], event, send_updates: "all")
  end
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
#  uid                                :string           not null
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#  application_id                     :bigint
#  user_id                            :bigint
#  zoom_meeting_id                    :string
#
# Indexes
#
#  index_interviews_on_application_id  (application_id)
#  index_interviews_on_uid             (uid) UNIQUE
#  index_interviews_on_user_id         (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (application_id => applications.id)
#  fk_rails_...  (user_id => users.id)
#
