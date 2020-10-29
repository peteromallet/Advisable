require 'rails_helper'

RSpec.describe AccountMailer do
  describe "#reset_password" do
    let(:token) { Token.new }
    let(:account) { create(:account, reset_digest: Token.digest(token), reset_sent_at: Time.zone.now) }
    let(:mail) { AccountMailer.reset_password(id: account.id, token: token) }

    it 'renders correct headers' do
      expect(mail.to).to eq([account.email])
      expect(mail.subject).to eq("Reset password")
      expect(mail.from).to eq(["hello@advisable.com"])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match("reset your password")
    end
  end
end
