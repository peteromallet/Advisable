# frozen_string_literal: true

require "rails_helper"

RSpec.describe PaymentRequestDueJob do
  let!(:payment_request) { create(:payment_request, due_at: 2.weeks.ago) }

  it "sends a slack message, marks the payment request as past due, and informs the user" do
    expect(payment_request.status).to eq("pending")
    expect(payment_request.past_due).to be_falsey
    described_class.perform_now
    described_class.perform_now
    described_class.perform_now
    payment_request.reload
    expect(payment_request.status).to eq("pending")
    expect(payment_request.past_due).to be(true)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "payment_request_due", "deliver_now", {args: [payment_request]}).once
    expect(SlackMessageJob).to have_been_enqueued.with(channel: "payments", text: "Payment Request for *#{payment_request.company&.name}* (#{payment_request.company_id}) with *#{payment_request.specialist&.account&.name}* (#{payment_request.specialist&.uid}) is past due date! PaymentRequest: #{payment_request.uid}").once
  end

  context "when the payment request is not past due" do
    let!(:payment_request) { create(:payment_request) }

    it "does not send a slack message" do
      described_class.perform_now
      payment_request.reload
      expect(payment_request.status).to eq("pending")
      expect(SlackMessageJob).not_to have_been_enqueued
    end
  end
end
