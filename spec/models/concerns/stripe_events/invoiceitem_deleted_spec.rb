# frozen_string_literal: true

require "rails_helper"

RSpec.describe StripeEvents::InvoiceitemDeleted do
  let(:line_item) { create(:invoice_line_item, stripe_invoice_line_item_id: "ii_4567") }
  let(:event) do
    OpenStruct.new({
      type: "invoiceitem.deleted",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "ii_4567"
        })
      })
    })
  end

  it "deletes the invoice line item" do
    expect(InvoiceLineItem.find(line_item.id)).not_to be_nil
    StripeEvents.process(event)
    expect { InvoiceLineItem.find(line_item.id) }.to raise_error(ActiveRecord::RecordNotFound)
  end
end
