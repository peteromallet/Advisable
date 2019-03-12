require 'rails_helper'

describe StripeEvents::SourceChargeable do
  it "calls the Payments::Charge service" do
    event = OpenStruct.new({
      type: "source.chargeable",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "src_1234"
        })
      })
    })

    payment = create(:payment, status: "pending", source_id: "src_1234")
    expect(Payments::Charge).to receive(:call).with(payment)
    StripeEvents.process(event)
  end

  context "when the payment is not pending" do
    it "does nothing" do
      event = OpenStruct.new({
        type: "source.chargeable",
        data: OpenStruct.new({
          object: OpenStruct.new({
            id: "src_1234"
          })
        })
      })

      payment = create(:payment, status: "failed", source_id: "src_1234")
      expect(Payments::Charge).not_to receive(:call).with(payment)
      StripeEvents.process(event)
    end
  end

  context "when there is no payment" do
    it "does nothing" do
      event = OpenStruct.new({
        type: "source.chargeable",
        data: OpenStruct.new({
          object: OpenStruct.new({
            id: "src_1234"
          })
        })
      })

      payment = create(:payment, status: "pending", source_id: "src_3423")
      expect(Payments::Charge).not_to receive(:call).with(payment)
      StripeEvents.process(event)
    end
  end
end