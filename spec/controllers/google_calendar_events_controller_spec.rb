# frozen_string_literal: true

require "rails_helper"

RSpec.describe GoogleCalendarEventsController do
  context "with interviews" do
    let!(:interview) { create(:interview, status: "Call Scheduled", starts_at: 1.hour.from_now, google_calendar_id: "gcal-1") }
    let!(:interview2) { create(:interview, status: "Call Scheduled", starts_at: 1.hour.from_now, google_calendar_id: "gcal-2") }

    it "calls GoogleCalendar with handle_change" do
      expect_any_instance_of(GoogleCalendar).to receive(:handle_change).with(interview)
      expect_any_instance_of(GoogleCalendar).not_to receive(:handle_change).with(interview2)

      request.headers["X-Goog-Channel-Id"] = "gcal-1"
      post :create

      expect(response).to have_http_status(:ok)
    end
  end

  context "when not found" do
    it "throws not found" do
      request.headers["X-Goog-Channel-Id"] = "gcal-1"

      expect { post(:create) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
