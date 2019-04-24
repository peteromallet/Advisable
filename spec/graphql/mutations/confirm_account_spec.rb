require "rails_helper"

describe Mutations::ConfirmAccount do
  let(:token) { Token.new }
  let(:input_token) { token }
  let(:digest) { Token.digest(token) }
  let(:user) { create(:user, confirmation_digest: digest, confirmed_at: nil ) }
  let(:email) { user.email }

  let(:query) { %|
    mutation {
      confirmAccount(input: {
        email: "#{email}",
        token: "#{input_token}"
      }) {
        viewer {
          ... on User {
            confirmed
          }
        }
        errors {
          code
        }
      }
    }
  |}

  it "returns the viewer" do
    response = AdvisableSchema.execute(query)
    viewer = response["data"]["confirmAccount"]["viewer"]
    expect(viewer["confirmed"]).to be_truthy
  end
  
  it "confirms the account" do
    expect(user.reload.confirmed_at).to be_nil
    AdvisableSchema.execute(query)
    expect(user.reload.confirmed_at).to_not be_nil
  end

  context "when the account has already been confirmed" do
    let(:user) { create(:user, confirmation_digest: digest, confirmed_at: 2.hours.ago ) }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      error = response["data"]["confirmAccount"]["errors"][0]
      expect(error["code"]).to eq("accounts.already_confirmed")
    end
  end

  context "when the token is invalid" do
    let(:input_token) { Token.new }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      error = response["data"]["confirmAccount"]["errors"][0]
      expect(error["code"]).to eq("accounts.invalid_token")
    end
  end
end