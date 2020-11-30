require 'rails_helper'

# rubocop:disable RSpec/MessageSpies, RSpec/VerifiedDoubles
RSpec.describe Users::AddInvoiceItem do
  let(:user) { create(:user) }

  before do
    invoice = double("Invoice", {id: "inv_1234"})
    allow(Stripe::InvoiceItem).to receive(:create)
    allow(Stripe::Invoice).to receive(:list).and_return(OpenStruct.new({data: [invoice]}))
  end

  it "Creates a stripe invoice_item" do
    expect(Stripe::InvoiceItem).to receive(:create).with({
      customer: user.company.stripe_customer_id,
      unit_amount: 1000,
      quantity: 10,
      currency: "usd",
      invoice: "inv_1234",
      description: "description"
    })

    described_class.call(user: user, unit_amount: 1000, quantity: 10, description: "description")
  end

  context "when there is no existing draft invoice" do
    it "creates a new one" do
      allow(Stripe::Invoice).to receive(:list).and_return(OpenStruct.new({data: []}))

      expect(Stripe::Invoice).to receive(:create).with({
        auto_advance: false,
        days_until_due: 30,
        customer: user.company.stripe_customer_id,
        collection_method: "send_invoice"
      })

      described_class.call(user: user, unit_amount: 1000, quantity: 1, description: "description")
    end
  end
end
# rubocop:enable RSpec/MessageSpies, RSpec/VerifiedDoubles
