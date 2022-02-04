# frozen_string_literal: true

require "rails_helper"

RSpec.describe PaymentRequestDueJob do
  let!(:payment_request) { create(:payment_request, due_at: 2.weeks.ago) }

  it "sends a slack message and marks the payment request as past due" do
    expect(Slack).to receive(:message).with(
      channel: "payments",
      text: "Payment Request for *#{payment_request.company&.name}* (#{payment_request.company_id}) with *#{payment_request.specialist&.account&.name}* (#{payment_request.specialist&.uid}) is past due date! PaymentRequest: #{payment_request.uid}"
    ).once
    described_class.perform_now
    payment_request.reload
    expect(payment_request.status).to eq("past_due")
    described_class.perform_now
    described_class.perform_now
  end

  context "when the payment request is not past due" do
    let!(:payment_request) { create(:payment_request) }

    it "does not send a slack message" do
      expect(Slack).not_to receive(:message)
      described_class.perform_now
      payment_request.reload
      expect(payment_request.status).to eq("pending")
    end
  end
end
