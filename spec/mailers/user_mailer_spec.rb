require 'rails_helper'

RSpec.describe UserMailer do
  describe '#confirm' do
    let(:token) { Token.new }
    let(:user) { create(:user, account: create(:account, confirmation_digest: Token.digest(token))) }
    let(:mail) { UserMailer.confirm(uid: user.uid, token: token) }

    it 'renders correct headers' do
      expect(mail.to).to eq([user.account.email])
      expect(mail.subject).to eq("Account Confirmation")
      expect(mail.from).to eq(["hello@advisable.com"])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match("confirm your email")
    end
  end
end
