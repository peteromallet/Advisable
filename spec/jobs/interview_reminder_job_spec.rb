# frozen_string_literal: true

require "rails_helper"

RSpec.describe InterviewReminderJob do
  let(:status) { "Call Scheduled" }
  let(:starts_at) { 50.minutes.from_now }
  let!(:interview) { create(:interview, starts_at: starts_at, status: status) }

  it "sends reminder only once" do
    described_class.perform_now
    described_class.perform_now
    described_class.perform_now

    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_reminder", "deliver_now", {args: [interview]}).once
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "interview_reminder", "deliver_now", {args: [interview]}).once
  end

  context "when in the past" do
    let(:starts_at) { 5.minutes.ago }

    it "does not send reminder" do
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "interview_reminder", "deliver_now", {args: [interview]})
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "interview_reminder", "deliver_now", {args: [interview]})
    end
  end

  context "when too far in the future" do
    let(:starts_at) { 65.minutes.from_now }

    it "does not send reminder" do
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "interview_reminder", "deliver_now", {args: [interview]})
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "interview_reminder", "deliver_now", {args: [interview]})
    end
  end

  context "when the interview isn't scheduled" do
    let(:status) { "Call Requested" }

    it "does not send reminder" do
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "interview_reminder", "deliver_now", {args: [interview]})
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "interview_reminder", "deliver_now", {args: [interview]})
    end
  end

  context "when starts_at changes" do
    it "sends a reminder for every starts_at once" do
      described_class.perform_now
      described_class.perform_now
      described_class.perform_now
      interview.update!(starts_at: starts_at + 1.minute)
      described_class.perform_now
      described_class.perform_now
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_reminder", "deliver_now", {args: [interview]}).twice
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "interview_reminder", "deliver_now", {args: [interview]}).twice
    end
  end
end
