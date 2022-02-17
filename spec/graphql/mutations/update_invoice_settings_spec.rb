# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateInvoiceSettings do
  let(:company) do
    create(:company, {
      payments_setup: false,
      stripe_customer_id: "cus_123",
      invoice_name: nil,
      invoice_company_name: nil,
      billing_email: nil,
      vat_number: nil,
      address: nil
    })
  end

  let(:account) { create(:account, permissions: ["team_manager"]) }
  let(:user) { create(:user, company:, account:) }
  let(:current_user) { user }
  let(:query) do
    <<-GRAPHQL
      mutation {
        updateInvoiceSettings(input: {
          name: "contact name",
          companyName: "company name",
          billingEmail: "billing@test.com",
          vatNumber: "12345",
          address: {
            line1: "line1",
            line2: "line2",
            city: "city",
            state: "state",
            country: "ie",
            postcode: "NA"
          }
        }) {
          user {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:context) { {current_user:} }

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow(Stripe::Customer).to receive(:update).with("cus_123", {
      name: "company name",
      email: "billing@test.com"
    })
    allow(Stripe::Customer).to receive(:create_tax_id)
  end

  it "Sets the invoice_name" do
    expect do
      AdvisableSchema.execute(query, context:)
    end.to change(company, :invoice_name).from(nil).to("contact name")
  end

  it "Sets the invoice_company_name" do
    expect do
      AdvisableSchema.execute(query, context:)
    end.to change(company, :invoice_company_name).from(nil).to("company name")
  end

  it "Sets the billing_email" do
    expect do
      AdvisableSchema.execute(query, context:)
    end.to change(company, :billing_email).from(nil).to("billing@test.com")
  end

  it "Sets the vat_number" do
    expect do
      AdvisableSchema.execute(query, context:)
    end.to change(company, :vat_number).from(nil).to("12345")
  end

  it "Sets the address" do
    expect(company.address.line1).to be_nil
    expect(company.address.line2).to be_nil
    expect(company.address.city).to be_nil
    expect(company.address.state).to be_nil
    expect(company.address.country).to be_nil
    expect(company.address.postcode).to be_nil
    AdvisableSchema.execute(query, context:)
    expect(company.address.line1).to eq("line1")
    expect(company.address.line2).to eq("line2")
    expect(company.address.city).to eq("city")
    expect(company.address.state).to eq("state")
    expect(company.address.country).to eq("ie")
    expect(company.address.postcode).to eq("NA")
  end

  it "Sets payments_setup to true" do
    expect(company.reload.payments_setup).to be_falsey
    AdvisableSchema.execute(query, context:)
    expect(company.reload.payments_setup).to be_truthy
  end

  it "sets the vat number inside of stripe" do
    AdvisableSchema.execute(query, context:)

    expect(Stripe::Customer).to have_received(:create_tax_id).with(
      "cus_123",
      {type: "eu_vat", value: "12345"},
      {idempotency_key: "#{company.id}-#{company.vat_number}"}
    )
  end

  context "when the current user is not a manager" do
    let(:account) { create(:account, permissions: []) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_TEAM_MANAGER")
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when syncing VAT with stripe returns an error" do
    before do
      error = Stripe::InvalidRequestError.new("message", "param")
      allow(Stripe::Customer).to receive(:create_tax_id).and_raise(error)
    end

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("INVALID_VAT")
    end
  end
end
