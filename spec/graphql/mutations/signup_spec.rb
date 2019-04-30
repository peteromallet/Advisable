require "rails_helper"

describe Mutations::Signup do
  let(:user) { create(:user, password: nil) }
  let(:id) { user.airtable_id }
  let(:email) { user.email }
  let(:password) { "testing123" }

  let(:query) { %|
    mutation {
      signup(input: {
        id: "#{id}",
        email: "#{email}",
        password: "#{password}",
        passwordConfirmation: "#{password}"
      }) {
        token
        errors {
          code
        }
      }
    }
  |}

  let(:response) { AdvisableSchema.execute(query) }

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it "returns a JWT" do
    token = response["data"]["signup"]["token"]
    expect(token).to_not be_nil
  end

  context "when the user is a specialist" do
    let(:user) { create(:specialist, password: nil) }
    
    it "returns a JWT" do
      token = response["data"]["signup"]["token"]
      expect(token).to_not be_nil
    end
  end

  context "when the id is incorrect" do
    let(:id) { "wrong_id" }

    it "returns an error" do
      error = response["data"]["signup"]["errors"][0]
      expect(error["code"]).to eq("account_not_found")
    end
  end

  context "when the account already exists" do
    let(:user) { create(:user, password: "testing123") }
    
    it "returns an error" do
      error = response["data"]["signup"]["errors"][0]
      expect(error["code"]).to eq("account_already_exists")
    end
  end
end