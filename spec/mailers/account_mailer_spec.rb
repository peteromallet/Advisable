require 'rails_helper'

RSpec.describe AccountMailer do
  describe '#confirm' do
    let(:token) { Token.new }
    let(:user) { create(:user, account: create(:account, confirmation_digest: Token.digest(token))) }
    let(:mail) {
      AccountMailer.confirm(uid: user.uid, token: token)
    }

    it 'renders correct headers' do
      expect(mail.to).to eq([user.account.email])
      expect(mail.subject).to eq("Account Confirmation")
      expect(mail.from).to eq(["hello@advisable.com"])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match("confirm your email")
    end
  end

  describe "#reset_password" do
    let(:token) { Token.new }
    let(:account) { create(:account, reset_digest: Token.digest(token), reset_sent_at: Time.zone.now) }
    let(:user) { create(:user, account: account) }
    let(:mail) {
      AccountMailer.reset_password(uid: user.uid, token: token)
    }

    it 'renders correct headers' do
      expect(mail.to).to eq([user.account.email])
      expect(mail.subject).to eq("Reset password")
      expect(mail.from).to eq(["hello@advisable.com"])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match("reset your password")
    end
  end
end
