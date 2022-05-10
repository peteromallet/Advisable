# frozen_string_literal: true

require "rails_helper"

RSpec.describe InterviewRequestAutoDeclineJob do
  let(:status) { "Call Reminded" }
  let(:created_at) { 5.days.ago }
  let(:conversation) { create(:conversation) }
  let!(:interview) { create(:interview, created_at:, status:) }

  before do
    create(:message, interview:, conversation:)
  end

  it "sends reminder only once" do
    expect(conversation.messages.where(kind: "InterviewAutoDeclined")).not_to exist

    described_class.perform_now
    described_class.perform_now
    described_class.perform_now

    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_request_auto_declined", "deliver_now", {args: [interview]}).once
    # expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "interview_request_auto_declined", "deliver_now", {args: [interview]}).once
    expect(conversation.messages.where(kind: "InterviewAutoDeclined")).to exist
  end

  context "when less than 4 days ago" do
    let(:created_at) { 3.days.ago }

    it "does not send reminder" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "interview_request_auto_declined", "deliver_now", any_args)
      # expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "interview_request_auto_declined", "deliver_now", any_args)
      expect(conversation.messages.where(kind: "InterviewAutoDeclined")).not_to exist
    end
  end

  context "when the interview isn't reminded" do
    let(:status) { "Call Scheduled" }

    it "does not send reminder" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "interview_request_auto_declined", "deliver_now", any_args)
      expect(conversation.messages.where(kind: "InterviewAutoDeclined")).not_to exist
      # expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "interview_request_auto_declined", "deliver_now", any_args)
    end
  end
end
