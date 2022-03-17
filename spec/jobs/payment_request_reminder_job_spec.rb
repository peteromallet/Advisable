# frozen_string_literal: true

require "rails_helper"

RSpec.describe PaymentRequestReminderJob do
  let!(:payment_request) { create(:payment_request, created_at: 3.days.ago) }

  it "sends an email and adds the reminder date to payment_request" do
    expect(payment_request.reminders).to be_empty
    described_class.perform_now
    payment_request.reload
    described_class.perform_now
    described_class.perform_now
    expect(payment_request.reminders).to eq([(payment_request.created_at + 2.days).to_i])
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "payment_request_reminder", "deliver_now", {args: [payment_request]}).once
  end

  context "when the payment request is fresh" do
    let!(:payment_request) { create(:payment_request) }

    it "does not send an email" do
      expect(payment_request.reminders).to be_empty
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "payment_request_reminder", "deliver_now", {args: [payment_request]}).once
      payment_request.reload
      expect(payment_request.reminders).to be_empty
    end
  end

  context "when we have already sent an email" do
    let!(:payment_request) { create(:payment_request, created_at: 3.days.ago, reminders: [1.day.ago.to_i]) }

    it "does not send an email" do
      described_class.perform_now
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("UserMailer", "payment_request_reminder", "deliver_now", {args: [payment_request]}).once
      payment_request.reload
      expect(payment_request.reminders).to eq([(payment_request.created_at + 2.days).to_i])
    end
  end

  context "when we have already sent an email but we should send another one" do
    let!(:payment_request) { create(:payment_request, created_at: 5.days.ago, reminders: [3.days.ago.to_i]) }

    it "sends an email and adds the reminder date to payment_request" do
      expect(payment_request.reminders).to eq([(payment_request.created_at + 2.days).to_i])
      described_class.perform_now
      payment_request.reload
      described_class.perform_now
      described_class.perform_now
      expect(payment_request.reminders).to eq([(payment_request.created_at + 2.days).to_i, (payment_request.created_at + 4.days).to_i])
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "payment_request_reminder", "deliver_now", {args: [payment_request]}).once
    end
  end

  context "when we have not sent any emails but it's already past due for 2" do
    let!(:payment_request) { create(:payment_request, created_at: 5.days.ago) }

    it "sends an email and adds the reminder date to payment_request" do
      expect(payment_request.reminders).to be_empty
      described_class.perform_now
      payment_request.reload
      described_class.perform_now
      described_class.perform_now
      expect(payment_request.reminders).to eq([(payment_request.created_at + 2.days).to_i, (payment_request.created_at + 4.days).to_i])
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "payment_request_reminder", "deliver_now", {args: [payment_request]}).once
    end
  end
end
