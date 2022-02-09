# frozen_string_literal: true

require "rails_helper"

RSpec.describe ConsultationReminderJob do
  let(:status) { "Request Completed" }
  let(:created_at) { 3.days.ago }
  let!(:consultation) { create(:consultation, created_at:, status:) }

  it "sends reminder only once" do
    described_class.perform_now
    described_class.perform_now
    described_class.perform_now

    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "consultation_request_reminder", "deliver_now", {args: [consultation]}).once
  end

  context "when less than 2 days ago" do
    let(:created_at) { 1.day.ago }

    it "does not send reminder" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "consultation_request_reminder", "deliver_now", any_args)
    end
  end

  context "when the consultation isn't scheduled" do
    let(:status) { "Accepted By Specialist" }

    it "does not send reminder" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "consultation_request_reminder", "deliver_now", any_args)
    end
  end
end
