require "rails_helper"

describe Accounts::Confirm do
  it 'confirms the user account' do
    digest = Token.digest("testing123")
    user = create(:user, confirmation_digest: digest, confirmed_at: nil)
    Accounts::Confirm.call(account: user, token: "testing123")
    expect(user.reload.confirmed_at).to_not be_nil
    expect(user.reload.confirmation_digest).to be_nil
  end

  context "when the token is invalid" do
    it "raises an error" do
      digest = Token.digest("testing123")
      user = create(:user, confirmation_digest: digest, confirmed_at: nil)
      expect {
        Accounts::Confirm.call(account: user, token: "wrong")
      }.to raise_error(Service::Error, "accounts.invalid_token")
    end
  end

  context "when there is no confirmation_digest" do
    it "raises an error" do
      digest = Token.digest("testing123")
      user = create(:user, confirmation_digest: nil, confirmed_at: nil)
      expect {
        Accounts::Confirm.call(account: user, token: "wrong")
      }.to raise_error(Service::Error, "accounts.invalid_token")
    end
  end

  context "when the account has already been confirmed" do
    it "raises an error" do
      digest = Token.digest("testing123")
      user = create(:user, confirmation_digest: digest, confirmed_at: DateTime.now)
      expect {
        Accounts::Confirm.call(account: user, token: "testing123")
      }.to raise_error(Service::Error, "accounts.already_confirmed")
    end
  end
end