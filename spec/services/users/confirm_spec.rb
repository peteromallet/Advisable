require "rails_helper"

describe Users::Confirm do
  it 'confirms the user account' do
    digest = Token.digest("testing123")
    user = create(:user, confirmation_digest: digest, confirmed_at: nil)
    Users::Confirm.call(user: user, token: "testing123")
    expect(user.reload.confirmed_at).to_not be_nil
    expect(user.reload.confirmation_digest).to be_nil
  end

  context "when the token is invalid" do
    it "raises an error" do
      digest = Token.digest("testing123")
      user = create(:user, confirmation_digest: digest, confirmed_at: nil)
      expect {
        Users::Confirm.call(user: user, token: "wrong")
      }.to raise_error(Service::Error, "Invalid token")
    end
  end

  context "when the account has already been confirmed" do
    it "raises an error" do
      digest = Token.digest("testing123")
      user = create(:user, confirmation_digest: digest, confirmed_at: DateTime.now)
      expect {
        Users::Confirm.call(user: user, token: "testing123")
      }.to raise_error(Service::Error, "Already confirmed")
    end
  end
end