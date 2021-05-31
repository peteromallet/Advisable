# frozen_string_literal: true

require "rails_helper"

RSpec.describe Invoice, type: :model do
  let(:invoice) { create(:invoice) }

  it "has a valid factory" do
    invoice = build(:invoice)
    expect(invoice).to be_valid
  end

  describe "#total" do
    before do
      invoice.line_items.create!(amount: 40)
      invoice.line_items.create!(amount: 60)
      invoice.line_items.create!(name: "Admin fee", metadata: {charge_freelancer: false}, amount: 5)
    end

    it "sums up the line items" do
      expect(invoice.total).to eq(105)
    end

    context "when for_specialist: true" do
      it "does not charge fee" do
        expect(invoice.total(for_specialist: true)).to eq(100)
      end
    end
  end

  describe "#create_admin_fee!" do
    it "creates admin fee" do
      invoice.line_items.create!(amount: 40)
      invoice.line_items.create!(amount: 60)

      expect_any_instance_of(InvoiceLineItem).to receive(:create_in_stripe!).with(now: true)
      invoice.create_admin_fee!
      expect(invoice.line_items.count).to eq(3)
      expect(invoice.total).to eq(105)
      expect(invoice.total(for_specialist: true)).to eq(100)
    end

    it "raises error if fee already exists" do
      invoice.line_items.create!(amount: 40)
      invoice.line_items.create!(name: "Admin fee", metadata: {charge_freelancer: false}, amount: 5)

      expect { invoice.create_admin_fee! }.to raise_error(Invoice::InvoiceError).with_message("Fee already created on this invoice")
    end
  end
end
