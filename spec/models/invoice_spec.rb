# frozen_string_literal: true

require "rails_helper"

RSpec.describe Invoice, type: :model do
  let(:project) { create(:project) }
  let(:application) { create(:application, project: project) }
  let(:invoice) { create(:invoice, application: application) }

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

  describe "#apply_deposit!" do
    context "when project has deposit left" do
      let(:project) { create(:project, deposit_paid: 100, deposit_used: 0) }

      it "creates deposit fee" do
        expect_any_instance_of(InvoiceLineItem).to receive(:create_in_stripe!).with(now: true) do |li|
          li.update(stripe_invoice_line_item_id: "ii_successful_stripe_id_here")
        end

        invoice.apply_deposit!
        expect(invoice.line_items.count).to eq(1)
        expect(invoice.total).to eq(-100)
        expect(invoice.total(for_specialist: true)).to eq(0)
        expect(project.reload.deposit_used).to eq(100)
      end

      it "raises error if line item isn't persisted in stripe" do
        expect_any_instance_of(InvoiceLineItem).to receive(:create_in_stripe!).with(now: true)

        invoice.line_items.create!(amount: 40)

        expect { invoice.apply_deposit! }.to raise_error(Invoice::InvoiceError).with_message("Something went wrong when applying deposit")
      end
    end

    context "when project has no more deposit left" do
      let(:project) { create(:project, deposit_paid: 100, deposit_used: 100) }

      it "does not create deposit fee" do
        invoice.apply_deposit!
        expect(invoice.line_items.count).to eq(0)
        expect(invoice.total).to eq(0)
        expect(invoice.total(for_specialist: true)).to eq(0)
      end
    end
  end
end
