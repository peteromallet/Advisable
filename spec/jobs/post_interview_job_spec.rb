# frozen_string_literal: true

require "rails_helper"

RSpec.describe PostInterviewJob do
  let(:status) { "Call Scheduled" }
  let(:starts_at) { 20.minutes.ago }
  let!(:interview) { create(:interview, :with_specialist_and_user, starts_at:, status:) }

  it "updates all the statuses and schedules next job" do
    expect(interview.status).to eq("Call Scheduled")
    described_class.perform_now
    interview.reload
    expect(interview.status).to eq("Call Completed")
  end

  describe "sending notifications" do
    context "when specialist and user" do
      it "sends notification to a specialist" do
        described_class.perform_now
        notification = Notification.find_by(interview:)
        expect(notification).to be_present
        expect(notification.account).to eq(interview.specialist.account)
        expect(notification.action).to eq("send_agreement")
      end

      context "when there is already an agreement" do
        it "does not send notifications" do
          create(:agreement, company: interview.user.company, specialist: interview.specialist)
          described_class.perform_now
          notification = Notification.find_by(interview:)
          expect(notification).not_to be_present
        end
      end
    end

    context "when 2 specialists" do
      let!(:interview) { create(:interview) }

      it "does not send notifications" do
        described_class.perform_now
        notification = Notification.find_by(interview:)
        expect(notification).not_to be_present
      end
    end
  end

  it "sends post interview only once" do
    described_class.perform_now
    described_class.perform_now
    described_class.perform_now

    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "post_interview", "deliver_now", {args: [interview]}).once
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "post_interview", "deliver_now", {args: [interview]}).once
  end

  context "when there is already an agreement" do
    it "does not send emails" do
      create(:agreement, company: interview.user.company, specialist: interview.specialist)
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "post_interview", "deliver_now", anything)
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "post_interview", "deliver_now", anything)
    end
  end

  context "when too far in the past" do
    let(:starts_at) { 2.days.ago }

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
