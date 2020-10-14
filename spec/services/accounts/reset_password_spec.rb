require "rails_helper"

RSpec.describe Accounts::ResetPassword do
  it 'resets the users password' do
    digest = Token.digest("testing123")
    account = create(:account, reset_digest: digest, reset_sent_at: 30.seconds.ago)
    previous_password = account.password_digest
    Accounts::ResetPassword.call(
      account: account,
      token: "testing123",
      password: "passwordchanged",
      password_confirmation: "passwordchanged"
    )
    expect(account.reload.password_digest).to_not eq(previous_password)
  end

  context "when the reset_sent_at is greater than 2 hours ago" do
    it "raises an error" do
      digest = Token.digest("testing123")
      account = create(:account, reset_digest: digest, reset_sent_at: 3.hours.ago)
      expect {
        Accounts::ResetPassword.call(
          account: account,
          token: "testing123",
          password: "passwordchanged",
          password_confirmation: "passwordchanged"
        )
      }.to raise_error(Service::Error, "Password reset has expired")
    end
  end

  context "when the token is invalid" do
    it 'raises an error' do
      digest = Token.digest("testing123")
      account = create(:account, reset_digest: digest, reset_sent_at: 30.seconds.ago)
      expect {
        Accounts::ResetPassword.call(
          account: account,
          token: "wrongtoken",
          password: "passwordchanged",
          password_confirmation: "passwordchanged"
        )
        }.to raise_error(Service::Error, "Invalid token")
    end
  end
end
