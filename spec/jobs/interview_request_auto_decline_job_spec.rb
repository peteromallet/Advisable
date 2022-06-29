# frozen_string_literal: true

require "rails_helper"

RSpec.describe InterviewRequestAutoDeclineJob do
  let(:status) { "Call Reminded" }
  let(:created_at) { 5.days.ago }
  let(:conversation) { Conversation.by_accounts(interview.accounts) }
  let!(:interview) { create(:interview, :with_specialist_and_user, created_at:, status:) }

  it "sends reminder only once" do
    expect(conversation.messages.where(kind: "InterviewAutoDeclined")).not_to exist

    described_class.perform_now
    described_class.perform_now
    described_class.perform_now

    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "interview_auto_declined_to_participant", "deliver_now", {args: [interview.specialist.account, interview]}).once
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "interview_auto_declined_to_requestor", "deliver_now", {args: [interview.user.account, interview]}).once
    expect(conversation.messages.where(kind: "InterviewAutoDeclined")).to exist
  end

  context "when less than 4 days ago" do
    let(:created_at) { 3.days.ago }

    it "does not send reminder" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("AccountMailer", "interview_auto_declined_to_participant", "deliver_now", any_args)
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("AccountMailer", "interview_auto_declined_to_requestor", "deliver_now", any_args)
      expect(conversation.messages.where(kind: "InterviewAutoDeclined")).not_to exist
    end
  end

  context "when the interview isn't reminded" do
    let(:status) { "Call Scheduled" }

    it "does not send reminder" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("AccountMailer", "interview_auto_declined_to_participant", "deliver_now", any_args)
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("AccountMailer", "interview_auto_declined_to_requestor", "deliver_now", any_args)
      expect(conversation.messages.where(kind: "InterviewAutoDeclined")).not_to exist
    end
  end
end
