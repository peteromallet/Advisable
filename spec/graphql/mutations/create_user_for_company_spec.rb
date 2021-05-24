# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CreateUserForCompany do
  let(:user) { create(:user, :team_manager) }
  let(:context) { {current_user: user} }
  let(:email) { Faker::Internet.email }
  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createUserForCompany(input: {
        email: "#{email}",
        firstName: "#{first_name}",
        lastName: "#{last_name}",
        #{extra}
      }) {
        user {
          id
          company {
            id
          }
        }
      }
    }
    GRAPHQL
  end

  before { allow_any_instance_of(User).to receive(:sync_to_airtable) }

  it "creates a new user on the company and sends an email to new user" do
    response = AdvisableSchema.execute(query, context: context)
    uid = response["data"]["createUserForCompany"]["user"]["id"]
    created_user = User.find_by(uid: uid)
    expect(created_user.account.attributes.slice("email", "first_name", "last_name").values).to match_array([email, first_name, last_name])
    expect(created_user.account).not_to be_team_manager
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "invited_by_manager", "deliver_now", {args: [user, created_user]})
  end

  context "when name is empty" do
    let(:query) do
      <<-GRAPHQL
      mutation {
        createUserForCompany(input: {
          email: "#{email}"
        }) {
          user {
            id
          }
        }
      }
      GRAPHQL
    end

    it "creates a new user on the company and sends an email to new user" do
      response = AdvisableSchema.execute(query, context: context)
      errors = response["errors"]
      expect(errors.size).to eq(2)
      expect(errors.map { |e| e["extensions"]["argumentName"] }).to match_array(%w[firstName lastName])
    end
  end

  context "when no team manager permission" do
    let(:user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("MUST_BE_TEAM_MANAGER")
    end
  end

  context "when provided a blacklisted email" do
    let(:email) { "test@gmail.com" }

    it "returns an error" do
      create(:blacklisted_domain, domain: "gmail.com")
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("nonCorporateEmail")
    end
  end

  context "when provided an email that is already taken" do
    it "returns an error" do
      create(:user, account: create(:account, email: email))
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("EMAIL_TAKEN")
    end
  end

  context "when no email" do
    let(:email) { "" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("emailBlank")
    end
  end

  describe "set team manager" do
    context "when true" do
      let(:extra) { "teamManager: true" }

      it "created user is a team manager" do
        response = AdvisableSchema.execute(query, context: context)
        uid = response["data"]["createUserForCompany"]["user"]["id"]
        created_user = User.find_by(uid: uid)
        expect(created_user.account).to be_team_manager
      end
    end

    context "when false" do
      let(:extra) { "teamManager: false" }

      it "created user is not a team manager" do
        response = AdvisableSchema.execute(query, context: context)
        uid = response["data"]["createUserForCompany"]["user"]["id"]
        created_user = User.find_by(uid: uid)
        expect(created_user.account).not_to be_team_manager
      end
    end
  end
end
