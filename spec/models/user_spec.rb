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
      company = Company.new(
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
      )
      user = described_class.create(account: account, company: company)

      expect(user.company.invoice_settings).to eq({
        name: user.company.invoice_name,
        company_name: user.company.invoice_company_name,
        billing_email: user.company.billing_email,
        vat_number: user.account.vat_number,
        address: user.company.address
      })
    end
  end

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
