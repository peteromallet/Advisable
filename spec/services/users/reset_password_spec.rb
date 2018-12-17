require "rails_helper"

describe Users::ResetPassword do
  it 'resets the users password' do
    digest = Token.digest("testing123")
    user = create(:user, reset_digest: digest, reset_sent_at: 30.seconds.ago)
    previous_password = user.password_digest
    Users::ResetPassword.call(
      user: user,
      token: "testing123",
      password: "passwordchanged",
      password_confirmation: "passwordchanged"
    )
    expect(user.reload.password_digest).to_not eq(previous_password)
  end

  context "when the token is invalid" do
    it 'raises an error' do
      digest = Token.digest("testing123")
      user = create(:user, reset_digest: digest, reset_sent_at: 30.seconds.ago)
      expect {
        Users::ResetPassword.call(
          user: user,
          token: "wrongtoken",
          password: "passwordchanged",
          password_confirmation: "passwordchanged"
        )
        }.to raise_error(Service::Error, "Invalid token")
    end
  end
end