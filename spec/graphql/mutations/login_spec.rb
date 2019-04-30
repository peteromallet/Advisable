require "rails_helper"

describe Mutations::Login do
  let(:user) { create(:user, password: "testing123") }
  let(:email) { user.email }
  let(:password) { "testing123" }

  let(:query) { %|
    mutation {
      login(input: {
        email: "#{email}",
        password: "#{password}"
      }) {
        token
        errors {
          code
        }
      }
    }
  |}

  let(:response) { AdvisableSchema.execute(query, context: {}) }

  it "returns a JWT" do
    token = response["data"]["login"]["token"]
    expect(token).to_not be_nil
  end

  context "when the user is a specialist" do
    let(:user) { create(:specialist, password: "testing123") }
    
    it "returns a JWT" do
      token = response["data"]["login"]["token"]
      expect(token).to_not be_nil
    end
  end

  context "when the email is incorrect" do
    let(:email) { "wrong@advisable.com" }

    it "returns an error" do
      error = response["data"]["login"]["errors"][0]
      expect(error["code"]).to eq("authentication.failed")
    end
  end

  context "when the password is incorrect" do
    let(:password) { "wrongpassword123" }
    
    it "returns an error" do
      error = response["data"]["login"]["errors"][0]
      expect(error["code"]).to eq("authentication.failed")
    end
  end
end