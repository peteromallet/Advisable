require 'rails_helper'

RSpec.describe User, type: :model do
  include_examples "uid"

  it "has a valid factory" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "removes any availability in the past before saving" do
    user = create(:user)
    a = 1.day.ago.change({hour: 10, min: 0, sec: 0})
    b = 1.day.from_now.change({hour: 10, min: 0, sec: 0})
    user.availability = [a, b]
    expect(user.availability).to include(a)
    user.save
    expect(user.availability).not_to include(a)
    expect(user.availability).to include(b)
  end

  describe "#send_confirmation_email" do
    let(:user) { build(:user) }
    let(:mail) { double('email') } # rubocop:disable RSpec/VerifiedDoubles

    it "sets the confirmation_digest" do
      expect(user.account.confirmation_digest).to be_nil
      user.send_confirmation_email
      expect(user.account.reload.confirmation_digest).not_to be_nil
    end

    it 'sends the confirmation email' do
      expect(mail).to receive(:deliver_later) # rubocop:disable RSpec/MessageSpies
      allow(UserMailer).to receive(:confirm).and_return(mail)
      user.send_confirmation_email
    end
  end

  describe '#invoice_settings' do
    it 'returns a hash of the users invoice settings' do
      account = Account.new(email: "test@test.com", vat_number: "VAT")
      user = described_class.new({
        account: account,
        invoice_name: "Test Account",
        invoice_company_name: "Test Inc",
        billing_email: "test@test.com",
        address: {
          line1: "Test",
          line2: "Address",
          city: "Dublin",
          state: "Leinster",
          country: "IE",
          postcode: "00000"
        }
      })

      expect(user.invoice_settings).to eq({
        name: user.invoice_name,
        company_name: user.invoice_company_name,
        billing_email: user.billing_email,
        vat_number: user.account.vat_number,
        address: user.address
      })
    end
  end

  describe "#stripe_customer" do
    it "returns the stripe customer from company" do
      user = create(:user, :team_manager)
      customer = instance_double(Stripe::Customer)
      allow(Stripe::Customer).to receive(:retrieve).with({
        id: user.company.stripe_customer_id,
        expand: ["invoice_settings.default_payment_method"]
      }).and_return(customer)

      expect(user.stripe_customer).
        to eq(user.company.stripe_customer).
        and eq(customer)
    end
  end

  describe '#update_payments_setup' do
    it "sets payments_setup to true" do
      user = create(:user, project_payment_method: "Bank Transfer", payments_setup: nil, invoice_name: "Test", accepted_project_payment_terms_at: 2.hours.ago)
        expect {
          user.update_payments_setup
        }.to change {
          user.reload.payments_setup
        }.from(nil).to(true)
    end

    context 'when project_payment_method is nil' do
      it 'sets the payments_setup to false' do
        user = create(:user, project_payment_method: nil, payments_setup: nil)
        expect {
          user.update_payments_setup
        }.to change {
          user.reload.payments_setup
        }.from(nil).to(false)
      end
    end

    context "when the project payment method is Card and the payment_method is nil" do
      it "sets payments_setup to false" do
        user = create(:user, project_payment_method: "Card", payments_setup: nil)
        allow(user).to receive(:payment_method).and_return(nil)
        expect {
          user.update_payments_setup
        }.to change {
          user.reload.payments_setup
        }.from(nil).to(false)
      end
    end

    context 'when the invoice_name is nil' do
      it "sets payments_setup to false" do
        user = create(:user, project_payment_method: "Bank Transfer", payments_setup: nil, invoice_name: nil)
        expect {
          user.update_payments_setup
        }.to change {
          user.reload.payments_setup
        }.from(nil).to(false)
      end
    end

    context 'when accepted_project_payment_terms_at is nil' do
      it "sets payments_setup to false" do
        user = create(:user, project_payment_method: "Bank Transfer", payments_setup: nil, invoice_name: "Test", accepted_project_payment_terms_at: nil)
        expect {
          user.update_payments_setup
        }.to change {
          user.reload.payments_setup
        }.from(nil).to(false)
      end
    end
  end

  # rubocop:disable RSpec/VerifiedDoubles, RSpec/MessageSpies
  describe '#payment_method' do
    it 'calls invoice_settings.default_payment_method on the stripe customer' do
      user = create(:user)
      stripe_invoice_settings = double("InvoiceSettings")
      expect(stripe_invoice_settings).to receive(:default_payment_method)
      customer = double(Stripe::Customer, invoice_settings: stripe_invoice_settings)
      allow(user).to receive(:stripe_customer).and_return(customer)
      user.payment_method
    end
  end
  # rubocop:enable RSpec/VerifiedDoubles, RSpec/MessageSpies

  describe '#company_name' do
    context "when the user has a client record" do
      it "returns the clients name" do
        client = create(:client, name: "Test Corp")
        user = create(:user, client: client)
        expect(user.company_name).to eq(client.name)
      end
    end

    context 'when the user has no client record' do
      it "returns the clients name" do
        user = create(:user, client: nil, company_name: "Test Company")
        expect(user.company_name).to eq("Test Company")
      end
    end
  end
end
