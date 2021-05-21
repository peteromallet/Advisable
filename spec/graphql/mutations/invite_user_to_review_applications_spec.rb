# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::InviteUserToReviewApplications do
  let(:user) { create(:user, :team_manager) }
  let(:context) { {current_user: user} }
  let(:email) { Faker::Internet.email }
  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }
  let(:project) { create(:project, user: user) }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
    mutation {
      inviteUserToReviewApplications(input: {
        projectId: "#{project.uid}",
        email: "#{email}",
        firstName: "#{first_name}",
        lastName: "#{last_name}",
        #{extra}
      }) {
        user {
          id
        }
      }
    }
    GRAPHQL
  end

  before { allow_any_instance_of(User).to receive(:sync_to_airtable) }

  it "creates a new user on the company and sends an email to new user" do
    response = AdvisableSchema.execute(query, context: context)
    uid = response["data"]["inviteUserToReviewApplications"]["user"]["id"]
    created_user = User.find_by(uid: uid)
    expect(created_user.account.attributes.slice("email", "first_name", "last_name").values).to match_array([email, first_name, last_name])
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "invited_to_review_applications", "deliver_now", {args: [user, created_user, project, {application_id: nil}]})
  end

  context "when account already exists" do
    let(:existing_user) { create(:user) }
    let(:email) { existing_user.account.email }

    it "sends an email to existing user" do
      AdvisableSchema.execute(query, context: context)

      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "invited_to_review_applications", "deliver_now", {args: [user, existing_user, project, {application_id: nil}]})
    end
  end

  context "when provided project is not from the signed in user" do
    let(:project) { create(:project) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("invalidProject")
    end
  end

  context "when given application ID" do
    let(:application) { create(:application, project: project) }
    let(:extra) { "applicationId: \"#{application.uid}\"" }

    it "includes the application_id in the mail" do
      AdvisableSchema.execute(query, context: context)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "invited_to_review_applications", "deliver_now", {args: array_including({application_id: application.uid})})
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

  context "when email belongs to a specialist" do
    let(:specialist) { create(:specialist) }
    let(:email) { specialist.account.email }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("notAnUser")
    end
  end
end
