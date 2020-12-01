require "rails_helper"

RSpec.describe Company, type: :model do
  let(:company) { create(:company) }

  describe ".fresh_name_for" do
    let(:user) { create(:user, company_name: "Acme") }

    it "returns the same name as user's company" do
      expect(described_class.fresh_name_for(user.company_name)).to eq("Acme")
    end

    context "when company with that name already exists" do
      it "returns the same name as user's company with (2)" do
        create(:company, name: "Acme")
        expect(described_class.fresh_name_for(user.company_name)).to eq("Acme (2)")
      end

      it "returns the same name as user's company with a bigger number in parenthesis" do
        create(:company, name: "Acme")
        create(:company, name: "Acme (2)")
        expect(described_class.fresh_name_for(user.company_name)).to eq("Acme (3)")
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
        customer = double(Stripe::Customer, id: "cus_123") # rubocop:disable Rspec/VerifiedDoubles

        allow(Stripe::Customer).to receive(:create).with({
          email: user.account.email,
          name: company.name,
          metadata: {company_id: company.id}
        }).and_return(customer)

        expect {
          company.stripe_customer_id
        }.to change {
          company.reload[:stripe_customer_id]
        }.from(nil).to("cus_123")
      end
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
end
