# frozen_string_literal: true

require "rails_helper"

RSpec.describe InterviewRequestReminderJob do
  let(:status) { "Call Requested" }
  let(:created_at) { 3.days.ago }
  let!(:interview) { create(:interview, created_at:, status:) }

  it "sends reminder only once" do
    described_class.perform_now
    described_class.perform_now
    described_class.perform_now

    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_request_reminder", "deliver_now", {args: [interview]}).once
  end

  context "when less than 2 days ago" do
    let(:created_at) { 1.day.ago }

    it "does not send reminder" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "interview_request_reminder", "deliver_now", any_args)
    end
  end

  context "when the interview isn't scheduled" do
    let(:status) { "Declined" }

    it "does not send reminder" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "interview_request_reminder", "deliver_now", any_args)
    end
  end
end
