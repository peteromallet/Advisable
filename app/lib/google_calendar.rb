# frozen_string_literal: true

require "google/apis/calendar_v3"

class GoogleCalendar
  class GoogleCalendarError < StandardError; end
  include HostHelper

  attr_reader :service

  def initialize
    @service = Google::Apis::CalendarV3::CalendarService.new
  end

  def schedule_for_interview(interview)
    set_up_service
    interview.google_calendar_id.blank? ? create_event(interview) : reschedule_event(interview)
    watch_event(interview)
  rescue GoogleCalendarError => e
    raise e unless ENV["GOOGLE_CALENDAR_SKIP"] == "true"
  end

  def handle_change(interview)
    set_up_service
    event = service.get_event(ENV.fetch("GOOGLE_INTERVIEW_CALENDAR_ID", nil), interview.google_calendar_id)

    if event.attendees.any? { |a| a.response_status == "declined" }
      interview.auto_decline!
    else
      interview.reschedule!(event.start.date_time)
    end
  rescue GoogleCalendarError => e
    raise e unless ENV["GOOGLE_CALENDAR_SKIP"] == "true"
  end

  private

  def set_up_service
    return if service.authorization

    provider = AuthProvider.google_calendar.find do |p|
      p.refresh_google_token!
      service.authorization = p.google_secret.to_authorization
      service.list_calendar_lists.items.find do |calendar|
        calendar.id == ENV["GOOGLE_INTERVIEW_CALENDAR_ID"] && calendar.access_role == "owner"
      end
    end

    raise GoogleCalendarError, "No provider for Google Calendar" unless provider
  end

  def create_event(interview)
    reschedule_email = if interview.specialist_and_user?
                         "#{interview.user.company.sales_person.name} at #{interview.user.company.sales_person.email}"
                       else
                         "us at hello@advisable.com"
                       end

    description = <<~DESCRIPTION.strip
      You can use the following link for you call: #{app_host}/calls/#{interview.video_call.uid}.\n
      Please sign in to your Advisable account to join this call.\n
      If you'd like to reschedule, please email #{reschedule_email}.
    DESCRIPTION
    ends_at = interview.starts_at + 30.minutes
    attendees = interview.account_records.map { |acc| Google::Apis::CalendarV3::EventAttendee.new(email: acc.email) }
    event = Google::Apis::CalendarV3::Event.new(
      start: Google::Apis::CalendarV3::EventDateTime.new(date_time: interview.starts_at.rfc3339, time_zone: interview.starts_at.time_zone.tzinfo.name),
      end: Google::Apis::CalendarV3::EventDateTime.new(date_time: ends_at.rfc3339, time_zone: interview.starts_at.time_zone.tzinfo.name),
      location: "#{app_host}/calls/#{interview.video_call.uid}",
      reminders: Google::Apis::CalendarV3::Event::Reminders.new(use_default: true),
      summary: "Call with #{interview.account_records.map(&:name_with_company).to_sentence}",
      description:,
      attendees:
    )
    ser_event = service.insert_event(ENV.fetch("GOOGLE_INTERVIEW_CALENDAR_ID", nil), event, send_updates: "all")

    interview.update!(google_calendar_id: ser_event.id)
  end

  def reschedule_event(interview)
    ends_at = interview.starts_at + 30.minutes
    event = service.get_event(ENV.fetch("GOOGLE_INTERVIEW_CALENDAR_ID", nil), interview.google_calendar_id)
    event.start = Google::Apis::CalendarV3::EventDateTime.new(date_time: interview.starts_at.rfc3339, time_zone: interview.starts_at.time_zone.tzinfo.name)
    event.end = Google::Apis::CalendarV3::EventDateTime.new(date_time: ends_at.rfc3339, time_zone: interview.starts_at.time_zone.tzinfo.name)
    event.attendees = interview.account_records.map { |acc| Google::Apis::CalendarV3::EventAttendee.new(email: acc.email, response_status: "needsAction") }
    service.update_event(ENV.fetch("GOOGLE_INTERVIEW_CALENDAR_ID", nil), event.id, event, send_updates: "all")
  end

  def watch_event(interview)
    raise GoogleCalendarError, "Can't watch event that does not exist in Google Calendar" if interview.google_calendar_id.blank?

    channel = Google::Apis::CalendarV3::Channel.new(address: "#{app_host}/google_calendar_events", id: interview.google_calendar_id, type: "webhook")
    service.watch_event(ENV.fetch("GOOGLE_INTERVIEW_CALENDAR_ID", nil), channel)
  rescue Google::Apis::ClientError => e
    Sentry.capture_exception(e, extra: {interview_id: interview.id})
  end
end
