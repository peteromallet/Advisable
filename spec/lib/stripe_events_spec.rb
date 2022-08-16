# frozen_string_literal: true

require "rails_helper"

module StripeEvents
  class TestEvent < StripeEvents::BaseEvent
    def process
      "test"
    end
  end
end

RSpec.describe StripeEvents do
  describe "#process" do
    context "when there is event processesor for the event type" do
      it "returns the result of the processors #process method" do
        event = double("StripeEvent", type: "test.event")
        result = described_class.process(event)
        expect(result).to eq("test")
      end
    end

    context "when there is not event processesor for the event type" do
      it "returns true" do
        event = double("StripeEvent", type: "doesnt.exist")
        result = described_class.process(event)
        expect(result).to be_truthy
      end
    end
  end
end
