# frozen_string_literal: true

require "toby_helper"

RSpec.describe Toby::Resources::Payout do
  let(:payout) { create(:payout, processed_at:) }

  describe "#process" do
    let(:action) { described_class_action(:process) }

    context "when not yet processed" do
      let(:processed_at) { nil }

      it "marks it as processed" do
        expect(action).to be_callable(payout)
        expect(payout.reload.processed_at).to be_nil
        execute_action(action, payout)
        expect(payout.status).to eq("processed")
        expect(payout.processed_at).not_to be_nil
      end
    end

    context "when already processed" do
      let(:processed_at) { "1.1.2022" }

      it "does nothing" do
        expect(action).not_to be_callable(payout)
        execute_action(action, payout)
        expect(payout.processed_at).to eq(processed_at)
      end
    end

    context "with payment requests" do
      let(:payment_request) { create(:payment_request) }
      let(:payout) { create(:payout, payment_request:) }

      it "marks it as processed and request as paid out" do
        expect(action).to be_callable(payout)
        expect(payout.processed_at).to be_nil
        expect(payment_request.status).not_to eq("paid_out")
        execute_action(action, payout)
        expect(payout.status).to eq("processed")
        expect(payout.processed_at).not_to be_nil
        expect(payment_request.status).to eq("paid_out")
      end
    end
  end

  describe "#unprocess" do
    let(:action) { described_class_action(:unprocess) }
    let(:processed_at) { "1.1.2022" }

    it "marks it as unprocessed" do
      expect(action).to be_callable(payout)
      expect(payout.reload.processed_at).not_to be_nil
      execute_action(action, payout)
      expect(payout.status).to eq("pending")
      expect(payout.processed_at).to be_nil
    end

    context "when not yet processed" do
      let(:processed_at) { nil }

      it "does nothing" do
        expect(action).not_to be_callable(payout)
        execute_action(action, payout)
        expect(payout.reload.processed_at).to be_nil
      end
    end
  end
end
