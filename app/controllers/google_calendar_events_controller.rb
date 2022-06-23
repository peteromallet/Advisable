# frozen_string_literal: true

class GoogleCalendarEventsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    interview = Interview.find_by!(google_calendar_id: request.headers["X-Goog-Channel-Id"])
    GoogleCalendar.new.handle_change(interview)
    head :ok
  end
end
