RSpec.shared_examples "account" do
  let(:factory) { described_class.to_s.underscore.to_sym }

  describe "#send_confirmation_email" do
    it "sets the confirmation_digest" do
      user = build(factory, account: create(:account, confirmation_digest: nil))
      user.send_confirmation_email
      expect(user.account.reload.confirmation_digest).to_not be_nil
    end

    it 'sends the confirmation email' do
      user = build(factory, account: create(:account, confirmation_digest: nil))
      mail = double('email')
      expect(mail).to receive(:deliver_later)
      expect(AccountMailer).to receive(:confirm).and_return(mail)
      user.send_confirmation_email
    end
  end
end
