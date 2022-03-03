# frozen_string_literal: true

require "rails_helper"

RSpec.describe PostInterviewJob do
  let(:status) { "Call Scheduled" }
  let(:starts_at) { 20.minutes.ago }
  let!(:interview) { create(:interview, starts_at:, status:) }

  it "updates all the statuses and schedules next job" do
    expect(interview.status).to eq("Call Scheduled")
    expect(interview.application.status).to eq("Applied")
    described_class.perform_now
    interview.reload
    expect(interview.status).to eq("Call Completed")
    expect(interview.application.status).to eq("Interview Completed")
    expect(PostInterviewReminderJob).to have_been_enqueued.with(interview).at(interview.starts_at + 1.day)
  end

  it "sends post interview only once" do
    described_class.perform_now
    described_class.perform_now
    described_class.perform_now

    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "post_interview", "deliver_now", {args: [interview]}).once
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "post_interview", "deliver_now", {args: [interview]}).once
  end

  context "when too far in the past" do
    let(:starts_at) { 35.minutes.ago }

    it "does not send post interview" do
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "post_interview", "deliver_now", {args: [interview]})
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "post_interview", "deliver_now", {args: [interview]})
    end
  end

  context "when in the future" do
    let(:starts_at) { 5.minutes.from_now }

    it "does not send post interview" do
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "post_interview", "deliver_now", {args: [interview]})
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "post_interview", "deliver_now", {args: [interview]})
    end
  end

  context "when the interview isn't scheduled" do
    let(:status) { "Call Requested" }

    it "does not send post interview" do
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "post_interview", "deliver_now", {args: [interview]})
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "post_interview", "deliver_now", {args: [interview]})
    end
  end

  context "when status changes" do
    it "sends a post interview for every status once" do
      described_class.perform_now
      described_class.perform_now
      described_class.perform_now
      interview.reload.update!(status: "Call Scheduled")
      described_class.perform_now
      described_class.perform_now
      described_class.perform_now

      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "post_interview", "deliver_now", {args: [interview]}).twice
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "post_interview", "deliver_now", {args: [interview]}).twice
    end
  end
end
