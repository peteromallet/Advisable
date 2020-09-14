require 'rails_helper'

describe UserMailer do
  describe '#confirm' do
    let(:token) { Token.new }
    let(:user) { create(:user, confirmation_digest: Token.digest(token)) }
    let(:mail) {
      UserMailer.confirm(id: user.id, token: token)
    }

    it 'renders correct headers' do
      expect(mail.to).to eq([user.email])
      expect(mail.subject).to eq("Account Confirmation")
      expect(mail.from).to eq(["hello@advisable.com"])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match("confirm your email")
    end
  end

  describe "#reset_password" do
    let(:token) { Token.new }
    let(:user) { create(:user, reset_digest: Token.digest(token), reset_sent_at: Time.now) }
    let(:mail) {
      UserMailer.reset_password(id: user.id, token: token)
    }

    it 'renders correct headers' do
      expect(mail.to).to eq([user.email])
      expect(mail.subject).to eq("Reset password")
      expect(mail.from).to eq(["hello@advisable.com"])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match("reset your password")
    end
  end
end