# frozen_string_literal: true

require "rails_helper"

RSpec.describe StripeEvents::ChargeRefunded do
  let(:event) do
    OpenStruct.new({
      type: "charge.refunded",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "ch_1234",
          refunded: true,
          metadata: metadata
        })
      })
    })
  end

  let(:payment) { create(:payment) }
  let(:metadata) { OpenStruct.new({payment_type: "payment", payment: payment.uid, status: "succeeded"}) }

  it "updates the status" do
    StripeEvents.process(event)
    payment.reload
    expect(payment.status).to eq("refunded")
  end

  describe "no metadata" do
    let(:metadata) { OpenStruct.new }

    it "does nothing" do
      expect(StripeEvents.process(event)).to eq(nil)
    end
  end
end
