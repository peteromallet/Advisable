require "rails_helper"

class StripeEvents::TestEvent
  def initialize(event)
  end

  def process
    return "test"
  end
end

RSpec.describe StripeEvents do
  describe "#process" do
    context "when there is event processesor for the event type" do
      it "returns the result of the processors #process method" do
        event = double("StripeEvent", type: "test.event")
        result = StripeEvents.process(event)
        expect(result).to eq("test")
      end
    end

    context "when there is not event processesor for the event type" do
      it "returns true" do
        event = double("StripeEvent", type: "doesnt.exist")
        result = StripeEvents.process(event)
        expect(result).to be_truthy
      end
    end
  end
end