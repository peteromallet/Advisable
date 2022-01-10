# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ResetPassword do
  let(:token) { Token.new }
  let(:input_token) { token }
  let(:digest) { Token.digest(token) }
  let(:account) { create(:account, reset_sent_at: 1.hour.ago, reset_digest: digest) }
  let!(:user) { create(:user, account:) }
  let(:password) { "newpassword123" }
  let(:query) do
    <<-GRAPHQL
    mutation {
      resetPassword(input: {
        email: "#{account.email}",
        token: "#{input_token}",
        password: "#{password}",
        passwordConfirmation: "#{password}",
      }) {
        reset
      }
    }
    GRAPHQL
  end

  it "returns reset true" do
    response = AdvisableSchema.execute(query)
    reset = response["data"]["resetPassword"]["reset"]
    expect(reset).to be_truthy
  end

  it "changes the users password" do
    previous_digest = user.account.password_digest
    AdvisableSchema.execute(query)
    expect(user.account.reload.password_digest).not_to eq(previous_digest)
    expect(user.account.reload.reset_sent_at).to be_nil
    expect(user.account.reload.reset_digest).to be_nil
  end

  context "when the token is invalid" do
    let(:input_token) { Token.new }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      code = response["errors"][0]["extensions"]["code"]
      expect(code).to eq("INVALID_TOKEN")
    end
  end

  context "when the password reset has expired" do
    let(:account) { create(:account, reset_sent_at: 10.hours.ago, reset_digest: digest) }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      code = response["errors"][0]["extensions"]["code"]
      expect(code).to eq("RESET_EXPIRED")
    end
  end

  context "when a password reset has not been requested" do
    let(:account) { create(:account, reset_sent_at: nil) }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      code = response["errors"][0]["extensions"]["code"]
      expect(code).to eq("RESET_NOT_REQUESTED")
    end
  end

  context "when the model validation fails" do
    let(:password) { "short" }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      code = response["errors"][0]["extensions"]["code"]
      expect(code).to eq("VALIDATION_FAILED")
    end
  end
end
