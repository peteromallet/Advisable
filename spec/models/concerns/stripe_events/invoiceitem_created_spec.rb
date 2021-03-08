# frozen_string_literal: true

require "rails_helper"

RSpec.describe StripeEvents::InvoiceitemCreated do
  let(:invoice) { create(:invoice, stripe_invoice_id: "in_1234") }
  let(:event) do
    OpenStruct.new({
      type: "invoiceitem.created",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "ii_4567",
          invoice: "in_1234",
          amount: "3000",
          description: "I'm mr. invoice line item, look at me!"
        })
      })
    })
  end

  it "creates invoice line item on the invoice" do
    expect(invoice.line_items).to be_empty
    StripeEvents.process(event)
    line_item = InvoiceLineItem.find_by(stripe_invoice_line_item_id: "ii_4567")
    expect(line_item.invoice_id).to eq(invoice.id)
    expect(line_item.amount).to eq(3000)
    expect(line_item.name).to eq("I'm mr. invoice line item, look at me!")
  end

  context "when it already exists" do
    let(:line_item) { create(:invoice_line_item, stripe_invoice_line_item_id: "ii_4567", invoice: invoice, name: "Test") }

    it "updates invoice line item" do
      expect(line_item.name).to eq("Test")
      StripeEvents.process(event)
      line_item.reload
      expect(line_item.amount).to eq(3000)
      expect(line_item.name).to eq("I'm mr. invoice line item, look at me!")
    end
  end
end
