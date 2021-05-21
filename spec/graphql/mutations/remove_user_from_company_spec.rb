# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::RemoveUserFromCompany do
  let(:user) { create(:user, :team_manager) }
  let(:context) { {current_user: user} }
  let(:dummy_account) { create(:account, remember_token: "aaa") }
  let(:dummy_user) { create(:user, company_id: user.company_id, account: dummy_account) }
  let(:email) { Faker::Internet.email }
  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
    mutation {
      removeUserFromCompany(input: {
        userId: "#{dummy_user.uid}"
      }) {
        success
      }
    }
    GRAPHQL
  end

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(TalkjsApi).to receive(:conversations_by).and_return([])
  end

  it "removes the user from the company" do
    response = AdvisableSchema.execute(query, context: context)
    success = response["data"]["removeUserFromCompany"]["success"]
    expect(success).to be_truthy

    dummy_user.reload
    expect(dummy_user).to be_disabled
    expect(dummy_user.account.remember_token).to be_nil
    expect(dummy_user.account.deleted_at).to be_nil
  end

  context "when no team manager permission" do
    let(:user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("MUST_BE_TEAM_MANAGER")
    end
  end

  context "when user belongs to a different company" do
    let(:dummy_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("USER_BELONGS_TO_A_DIFFERENT_COMPANY")
    end
  end

  context "when it's the last user in the company" do
    let(:dummy_user) { user }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("noUsersLeftInCompany")
    end
  end
end
