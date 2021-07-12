# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Payment, type: :model do
  let(:payment) { build(:payment, amount: 10000) }

  it "has a valid factory" do
    expect(payment).to be_valid
  end

  describe "#admin_fee" do
    it "sets fee if it's not present" do
      expect(payment.admin_fee).to be_nil
      payment.save!
      expect(payment.admin_fee).to eq(500)
    end

    context "when fee is set explicitly" do
      let(:payment) { build(:payment, admin_fee: 75) }

      it "does not overwrite it" do
        expect(payment.admin_fee).to eq(75)
        payment.save!
        expect(payment.admin_fee).to eq(75)
      end
    end
  end
end
