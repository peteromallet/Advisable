# frozen_string_literal: true

require "rails_helper"

RSpec.describe Payout, type: :model do
  let(:payout) { build(:payout, amount: 10000) }

  it "has a valid factory" do
    expect(payout).to be_valid
  end

  describe "#sourcing_fee" do
    it "sets fee if it's not present" do
      expect(payout.sourcing_fee).to be_nil
      payout.save!
      expect(payout.sourcing_fee).to eq(800)
    end

    context "when fee is set explicitly" do
      let(:payout) { build(:payout, sourcing_fee: 75) }

      it "does not overwrite it" do
        expect(payout.sourcing_fee).to eq(75)
        payout.save!
        expect(payout.sourcing_fee).to eq(75)
      end
    end
  end
end
