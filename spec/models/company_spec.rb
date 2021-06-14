# frozen_string_literal: true

require "rails_helper"

RSpec.describe Company, type: :model do
  let(:company) { create(:company) }

  describe ".fresh_name_for" do
    it "returns the same name as user's company" do
      expect(described_class.fresh_name_for("Acme")).to eq("Acme")
    end

    context "when company with that name already exists" do
      it "returns the same name as user's company with (2)" do
        create(:company, name: "Acme")
        expect(described_class.fresh_name_for("Acme")).to eq("Acme (2)")
      end

      it "returns the same name as user's company with a bigger number in parenthesis" do
        create(:company, name: "Acme")
        create(:company, name: "Acme (2)")
        expect(described_class.fresh_name_for("Acme")).to eq("Acme (3)")
      end
    end
  end

  describe "#stripe_customer_id" do
    context "when the company has a stripe customer id set" do
      it "returns the existing id" do
        expect(company.stripe_customer_id).to eq("cus_1234")
      end
    end

    context "when the company has no existing stripe customer id" do
      let(:company) { create(:company, stripe_customer_id: nil) }
      let(:user) { create(:user, company: company) }

      it "creates a new stripe customer and stores the id" do
        customer = double(Stripe::Customer, id: "cus_123") # rubocop:disable RSpec/VerifiedDoubles

        allow(Stripe::Customer).to receive(:create).with({
          email: user.account.email,
          name: company.name,
          metadata: {company_id: company.id}
        }).and_return(customer)

        expect do
          company.stripe_customer_id
        end.to change {
          company.reload[:stripe_customer_id]
        }.from(nil).to("cus_123")
      end
    end
  end

  describe '#invoice_settings' do
    it 'returns a hash of the users invoice settings' do
      company = described_class.new(
        invoice_name: "Test Account",
        invoice_company_name: "Test Inc",
        billing_email: "test@test.com",
        vat_number: "VAT",
        address: {
          line1: "Test",
          line2: "Address",
          city: "Dublin",
          state: "Leinster",
          country: "IE",
          postcode: "00000"
        }
      )

      expect(company.invoice_settings).to eq({
        name: company.invoice_name,
        company_name: company.invoice_company_name,
        billing_email: company.billing_email,
        vat_number: company.vat_number,
        address: company.address
      })
    end
  end

  describe "#stripe_customer" do
    it "returns the stripe customer" do
      customer = instance_double(Stripe::Customer)
      allow(Stripe::Customer).to receive(:retrieve).with({
        id: company.stripe_customer_id,
        expand: ["invoice_settings.default_payment_method"]
      }).and_return(customer)

      expect(company.stripe_customer).to eq(customer)
    end
  end

  describe '#update_payments_setup' do
    let(:payment_method) { instance_double(Stripe::PaymentMethod) }

    it "sets payments_setup to true" do
      company = create(:company, payments_setup: nil, invoice_name: "Test", accepted_project_payment_terms_at: 2.hours.ago)
      allow(company).to receive(:payment_method).and_return(payment_method)
      expect do
        company.update_payments_setup
      end.to change {
        company.reload.payments_setup
      }.from(nil).to(true)
    end

    context "when the payment_method is nil" do
      it "sets payments_setup to false" do
        company = create(:company, project_payment_method: "Card", payments_setup: nil)
        allow(company).to receive(:payment_method).and_return(nil)
        expect do
          company.update_payments_setup
        end.to change {
          company.reload.payments_setup
        }.from(nil).to(false)
      end
    end

    context 'when the invoice_name is nil' do
      it "sets payments_setup to false" do
        company = create(:company, project_payment_method: "Bank Transfer", payments_setup: nil, invoice_name: nil)
        allow(company).to receive(:payment_method).and_return(payment_method)
        expect do
          company.update_payments_setup
        end.to change {
          company.reload.payments_setup
        }.from(nil).to(false)
      end
    end

    context 'when accepted_project_payment_terms_at is nil' do
      it "sets payments_setup to false" do
        company = create(:company, project_payment_method: "Bank Transfer", payments_setup: nil, invoice_name: "Test", accepted_project_payment_terms_at: nil)
        allow(company).to receive(:payment_method).and_return(payment_method)
        expect do
          company.update_payments_setup
        end.to change {
          company.reload.payments_setup
        }.from(nil).to(false)
      end
    end
  end

  # rubocop:disable RSpec/VerifiedDoubles
  describe '#payment_method' do
    it 'calls invoice_settings.default_payment_method on the stripe customer' do
      company = create(:company)
      stripe_invoice_settings = double("InvoiceSettings")
      expect(stripe_invoice_settings).to receive(:default_payment_method)
      customer = double(Stripe::Customer, invoice_settings: stripe_invoice_settings)
      allow(company).to receive(:stripe_customer).and_return(customer)
      company.payment_method
    end
  end
  # rubocop:enable RSpec/VerifiedDoubles
end
