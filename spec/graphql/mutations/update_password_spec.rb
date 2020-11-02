require "rails_helper"

RSpec.describe Mutations::UpdatePassword do
  let(:account) { create(:account, password: current_password) }
  let(:user) { create(:user, account: account) }
  let(:current_password) { "testing123" }
  let(:password) { "123testing" }
  let(:password_confirmation) { password }
  let(:current_password_param) { current_password }
  let(:password_param) { password }
  let(:context) { {current_user: user} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      updatePassword(input: {
        currentPassword: "#{current_password_param}",
        password: "#{password_param}",
        passwordConfirmation: "#{password_confirmation}"
      }) {
        viewer {
          ... on User {
            id
            email
          }
          ... on Specialist {
            id
            email
          }
        }
      }
    }
    GRAPHQL
  end

  describe "happy path" do
    context "user" do
      it "updates password" do
        expect(account.authenticate(password)).to be_falsy
        AdvisableSchema.execute(query, context: context)
        expect(account.authenticate(password)).to be_truthy
      end
    end

    context "specialist" do
      let(:user) { create(:specialist, account: account) }

      it "updates password" do
        expect(account.authenticate(password)).to be_falsy
        AdvisableSchema.execute(query, context: context)
        expect(account.authenticate(password)).to be_truthy
      end
    end
  end

  describe "confirmation mismatch" do
    let(:password_param) { "1234testing" }

    it "does not change password" do
      expect(account.authenticate(password)).to be_falsy
      response = AdvisableSchema.execute(query, context: context)
      expect(response["errors"][0]["extensions"]["code"]).to eq("CAN_NOT_CHANGE_PASSWORD")
      expect(account.authenticate(password)).to be_falsy
    end
  end

  describe "wrong current password" do
    let(:current_password_param) { "testing1234" }

    it "does not change password" do
      expect(account.authenticate(password)).to be_falsy
      response = AdvisableSchema.execute(query, context: context)
      expect(response["errors"][0]["extensions"]["code"]).to eq("CAN_NOT_CHANGE_PASSWORD")
      expect(account.authenticate(password)).to be_falsy
    end
  end
end
