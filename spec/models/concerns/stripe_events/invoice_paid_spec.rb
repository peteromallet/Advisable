# frozen_string_literal: true

require "rails_helper"

RSpec.describe StripeEvents::InvoicePaid do
  let(:invoice) { create(:invoice, stripe_invoice_id: "in_1234") }
  let(:paid_at) { 5.minutes.ago.to_i }
  let(:event) do
    OpenStruct.new({
      type: "invoice.paid",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "in_1234",
          status: "paid",
          status_transitions: OpenStruct.new({paid_at: paid_at})
        })
      })
    })
  end

  it "updates status and paid at" do
    expect(invoice.status).to eq("draft")
    StripeEvents.process(event)
    invoice.reload
    expect(invoice.status).to eq("paid")
    expect(invoice.paid_at).to eq(Time.zone.at(paid_at))
  end
end
