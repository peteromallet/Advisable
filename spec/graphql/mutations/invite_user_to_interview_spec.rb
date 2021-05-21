# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::InviteUserToInterview do
  let(:user) { create(:user, :team_manager) }
  let(:context) { {current_user: user} }
  let(:email) { Faker::Internet.email }
  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }
  let(:project) { create(:project, user: user) }
  let(:application) { create(:application, project: project) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      inviteUserToInterview(input: {
        applicationId: "#{application.uid}",
        email: "#{email}",
        firstName: "#{first_name}",
        lastName: "#{last_name}",
      }) {
        user {
          id
        }
      }
    }
    GRAPHQL
  end

  before { allow_any_instance_of(User).to receive(:sync_to_airtable) }

  it "creates a new user on the company, sends an email to new user, and triggers a webhook" do
    expect(WebhookEvent).to receive(:trigger).with("user.invited_to_interview", hash_including(application: hash_including("uid" => application.uid), user: hash_including(email: email)))

    response = AdvisableSchema.execute(query, context: context)

    uid = response["data"]["inviteUserToInterview"]["user"]["id"]
    created_user = User.find_by(uid: uid)
    expect(created_user.account.attributes.slice("email", "first_name", "last_name").values).to match_array([email, first_name, last_name])
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "invited_to_interview", "deliver_now", {args: [user, created_user, application]})
  end

  context "when account already exists" do
    let(:existing_user) { create(:user) }
    let(:email) { existing_user.account.email }

    it "sends an email to existing user and triggers a webhook" do
      expect(WebhookEvent).to receive(:trigger).with("user.invited_to_interview", hash_including(application: hash_including("uid" => application.uid), user: hash_including(email: email)))

      AdvisableSchema.execute(query, context: context)

      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "invited_to_interview", "deliver_now", {args: [user, existing_user, application]})
    end
  end

  context "when provided application is not from the signed in user" do
    let(:application) { create(:application) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("invalidApplication")
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

  context "when no email" do
    let(:email) { "" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("EMAIL_BLANK")
    end
  end
end
