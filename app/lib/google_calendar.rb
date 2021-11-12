# frozen_string_literal: true

require "google/apis/calendar_v3"

class GoogleCalendar
  class GoogleCalendarError < StandardError; end

  attr_reader :service, :interview

  def initialize
    @service = Google::Apis::CalendarV3::CalendarService.new
  end

  def schedule_for_interview(interview)
    find_calendar_provider
    @interview = interview
    interview.google_calendar_id.blank? ? create_event : reschedule_event
  end

  private

  def find_calendar_provider
    provider = AuthProvider.google_calendar.find do |p|
      p.refresh_google_token!
      service.authorization = p.google_secret.to_authorization
      service.list_calendar_lists.items.find do |calendar|
        calendar.id == ENV["GOOGLE_INTERVIEW_CALENDAR_ID"] && calendar.access_role == "owner"
      end
    end

    raise GoogleCalendarError, "No provider for Google Calendar" unless provider
  end

  def create_event
    description = <<~DESCRIPTION.strip
      You can use the following link for you call: #{ApplicationMailer.default_url_options[:host]}/calls/#{interview.video_call.uid}.\n
      Please sign in to your Advisable account to join this call.\n
      If you'd like to reschedule, please email #{interview.user.company.sales_person.name} at #{interview.user.company.sales_person.email}.
    DESCRIPTION
    ends_at = interview.starts_at + 30.minutes
    event = Google::Apis::CalendarV3::Event.new(
      start: Google::Apis::CalendarV3::EventDateTime.new(date_time: interview.starts_at.rfc3339, time_zone: interview.starts_at.time_zone.tzinfo.name),
      end: Google::Apis::CalendarV3::EventDateTime.new(date_time: ends_at.rfc3339, time_zone: interview.starts_at.time_zone.tzinfo.name),
      location: "#{ApplicationMailer.default_url_options[:host]}/calls/#{interview.video_call.uid}",
      reminders: Google::Apis::CalendarV3::Event::Reminders.new(use_default: true),
      summary: "Call with #{interview.user.name_with_company} and #{interview.specialist.account.name} about #{interview.application.project.nice_name} Project",
      description: description,
      attendees: [
        Google::Apis::CalendarV3::EventAttendee.new(email: interview.user.account.email),
        Google::Apis::CalendarV3::EventAttendee.new(email: interview.specialist.account.email)
      ]
    )
    ser_event = service.insert_event(ENV["GOOGLE_INTERVIEW_CALENDAR_ID"], event, send_updates: "all")

    interview.update!(google_calendar_id: ser_event.id)
  end

  def reschedule_event
    ends_at = interview.starts_at + 30.minutes
    event = service.get_event(ENV["GOOGLE_INTERVIEW_CALENDAR_ID"], interview.google_calendar_id)
    event.start = Google::Apis::CalendarV3::EventDateTime.new(date_time: interview.starts_at.rfc3339, time_zone: interview.starts_at.time_zone.tzinfo.name)
    event.end = Google::Apis::CalendarV3::EventDateTime.new(date_time: ends_at.rfc3339, time_zone: interview.starts_at.time_zone.tzinfo.name)
    event.attendees = [
      Google::Apis::CalendarV3::EventAttendee.new(email: interview.user.account.email, response_status: "needsAction"),
      Google::Apis::CalendarV3::EventAttendee.new(email: interview.specialist.account.email, response_status: "needsAction")
    ]
    service.update_event("primary", event.id, event, send_updates: "all")
  end
end
