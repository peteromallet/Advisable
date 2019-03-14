require 'rails_helper'

describe StripeEvents::SourceFailed do
  it "calls the Payments::Failed service" do
    event = OpenStruct.new({
      type: "source.failed",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "src_1234"
        })
      })
    })

    payment = create(:payment, source_id: "src_1234")
    expect(Payments::Failed).to receive(:call).with(payment, "source_failed")
    StripeEvents.process(event)
  end

  context "when there is no payment" do
    it "does nothing" do
      event = OpenStruct.new({
        type: "source.failed",
        data: OpenStruct.new({
          object: OpenStruct.new({
            id: "src_1234"
          })
        })
      })

      payment = create(:payment, source_id: "src_3423")
      expect(Payments::Failed).not_to receive(:call).with(payment, "source_failed")
      StripeEvents.process(event)
    end
  end
end