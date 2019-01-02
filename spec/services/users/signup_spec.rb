require 'rails_helper'

describe Users::Signup do
  context "when there is no existing user" do
    it "creates a new user account" do
      expect {
        Users::Signup.call(email:"testing1234@test.com", password: "testing123", password_confirmation: "testing123")
      }.to change {User.count}.by(1)
    end
  end

  context "when a user exists with that email" do
    context "and they have not confirmed their account" do
      it "sets their password" do
        user = create(:user, confirmed_at: nil, password: nil)
        expect(user.reload.password_digest).to be_nil
        Users::Signup.call(email: user.email, password: "testing123", password_confirmation: "testing123")
        expect(user.reload.password_digest).to_not be_nil
      end
    end

    context "and they have confirmed their account" do
      it "has an email taken error" do
        user = create(:user, confirmed_at: DateTime.now)
        expect {
          Users::Signup.call(email: user.email, password: "testing123", password_confirmation: "testing123")
        }.to raise_error(Service::Error, 'users.email_taken')
      end
    end
  end
end