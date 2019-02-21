require "rails_helper"

describe Accounts::Login do
  context "when the credentials are correct" do
    it "returns a token" do
      user = create(:user, password: "testing123")
      r = Accounts::Login.call(email: user.email, password: "testing123")
      expect(r).to_not be_nil
    end
  end

  context "when the credentials are incorrect" do
    it "raises an error" do
      user = create(:user, password: "testing123")
      expect {
        Accounts::Login.call(email: user.email, password: "wrong")
      }.to raise_error(Service::Error, "authentication.failed")
    end
  end
end