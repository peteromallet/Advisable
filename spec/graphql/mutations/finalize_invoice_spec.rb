# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::FinalizeInvoice do
  let(:invoice) { create(:invoice, stripe_invoice_id: "asdf1234") }
  let(:context) { {current_user: current_user} }
  let(:current_user) { invoice.application.specialist }

  let(:query) do
    <<-GRAPHQL
    mutation {
      finalizeInvoice(input: {
        id: "#{invoice.id}"
      }) {
        invoice {
          id
          status
        }
      }
    }
    GRAPHQL
  end

  it "adds the admin fee and finalizes the invoice" do
    invoice.line_items.create!(amount: 40)
    invoice.line_items.create!(amount: 60)

    allow(Stripe::Invoice).to receive(:finalize_invoice).with("asdf1234", auto_advance: false).and_return(OpenStruct.new(status: "open"))
    expect_any_instance_of(InvoiceLineItem).to receive(:create_in_stripe!).with(now: true)
    response = AdvisableSchema.execute(query, context: context)
    status = response["data"]["finalizeInvoice"]["invoice"]["status"]
    expect(status).to eq("open")

    expect(invoice.reload.line_items.sum(:amount)).to eq(105)
  end

  context "when logged in user is a different specialist" do
    let(:current_user) { create(:specialist) }

    it "raises an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when logged in user is a different user" do
    let(:current_user) { create(:user) }

    it "raises an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when not logged in" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      expect(response["errors"][0]["extensions"]["type"]).to eq("NOT_AUTHENTICATED")
    end
  end
end
