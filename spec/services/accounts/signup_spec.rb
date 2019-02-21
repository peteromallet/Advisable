require 'rails_helper'

describe Accounts::Signup do
  context "when there is no existing user" do
    it "creates a new user account" do
      expect {
        Accounts::Signup.call(email:"testing1234@test.com", password: "testing123", password_confirmation: "testing123")
      }.to change {User.count}.by(1)
    end
  end

  context "when a user exists with that email" do
    context "and they have not confirmed their account" do
      it "sets their password" do
        user = create(:user, confirmed_at: nil, password: nil)
        expect(user.reload.password_digest).to be_nil
        Accounts::Signup.call(email: user.email, password: "testing123", password_confirmation: "testing123")
        expect(user.reload.password_digest).to_not be_nil
      end
    end

    context "and they have confirmed their account" do
      it "has an email taken error" do
        user = create(:user, confirmed_at: DateTime.now)
        expect {
          Accounts::Signup.call(email: user.email, password: "testing123", password_confirmation: "testing123")
        }.to raise_error(Service::Error, 'users.email_taken')
      end
    end
  end

  context "when the type is Specialist" do
    it "creates a new specialist account" do
      specialist = create(:specialist, email: "testing1234@test.com", password: nil)
      Accounts::Signup.call(type: "Specialist", email:"testing1234@test.com", password: "testing123", password_confirmation: "testing123")
      expect(specialist.reload.password_digest).to_not be_nil
    end
  end
end