# frozen_string_literal: true

require "rails_helper"

RSpec.describe PaymentRequestReminderJob do
  let!(:payment_request) { create(:payment_request, created_at: 3.days.ago) }

  it "sends an email and adds the reminder date to payment_request" do
    expect(payment_request.reminded_at).to be_nil
    described_class.perform_now
    payment_request.reload
    described_class.perform_now
    described_class.perform_now
    expect(payment_request.reminded_at).to be_within(1.second).of(Time.current)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "payment_request_reminder", "deliver_now", {args: [payment_request]}).once
  end

  context "when agreement has custom due days set" do
    let(:agreement) { create(:agreement, due_days: 5) }
    let!(:payment_request) { create(:payment_request, created_at: 3.days.ago, agreement:) }

    it "does not send an email" do
      expect(payment_request.reminded_at).to be_nil
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "payment_request_reminder", "deliver_now", {args: [payment_request]}).once
      payment_request.reload
      expect(payment_request.reminded_at).to be_nil
    end
  end

  context "when the payment request is fresh" do
    let!(:payment_request) { create(:payment_request) }

    it "does not send an email" do
      expect(payment_request.reminded_at).to be_nil
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "payment_request_reminder", "deliver_now", {args: [payment_request]}).once
      payment_request.reload
      expect(payment_request.reminded_at).to be_nil
    end
  end

  context "when we have already sent an email" do
    let!(:payment_request) { create(:payment_request, created_at: 3.days.ago, reminded_at: 1.day.ago) }

    it "does not send an email" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "payment_request_reminder", "deliver_now", {args: [payment_request]}).once
      payment_request.reload
      expect(payment_request.reminded_at).to be_within(1.second).of(1.day.ago)
    end
  end
end
