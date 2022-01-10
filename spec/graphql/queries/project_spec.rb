# frozen_string_literal: true

require "rails_helper"

RSpec.describe "project root query", type: :system do
  let(:user) { create(:user) }
  let(:project) { create(:project, user:) }
  let(:query) do
    <<-GRAPHQL
    {
      project(id: "#{project.uid}") {
        id
        viewerCanAccess
      }
    }
    GRAPHQL
  end

  context "when a user is logged in" do
    it "returns the project" do
      response = AdvisableSchema.execute(query, context: {current_user: user})
      expect(response["data"]["project"]["id"]).to eq(project.uid)
    end

    context "when they do not own the project" do
      it "returns viewerCanAccess false" do
        another_user = create(:user)
        response =
          AdvisableSchema.execute(
            query,
            context: {current_user: another_user}
          )
        expect(response["data"]["project"]["viewerCanAccess"]).to be_falsey
      end
    end
  end

  context "when there is no user logged in" do
    context "when the project user has an account" do
      it "returns 'authenticationRequired' error" do
        response =
          AdvisableSchema.execute(query, context: {current_user: nil})
        error = response["errors"].first
        expect(error["extensions"]["code"]).to eq("NOT_AUTHENTICATED")
      end
    end

    context "when the project user does not have an account" do
      let(:user) { create(:user, account: create(:account, password: nil)) }

      it "returns 'authenticationRequired' error" do
        response = AdvisableSchema.execute(query, context: {current_user: nil})
        error = response["errors"].first
        expect(error["extensions"]["code"]).to eq("SIGNUP_REQUIRED")
      end
    end
  end
end
