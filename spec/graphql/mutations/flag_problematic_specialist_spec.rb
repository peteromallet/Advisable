# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::FlagProblematicSpecialist do
  let(:user) { create(:user) }
  let(:application) { create(:application) }
  let(:message) { "This guy. I mean. COME ON!" }

  let(:query) do
    <<-GRAPHQL
    mutation {
      flagProblematicSpecialist(input: {
        applicationId: "#{application.uid}",
        message: "#{message}"
      }) {
        success
      }
    }
    GRAPHQL
  end

  let(:context) { {current_user: user} }

  it "creates the flag and schedules the mailer" do
    response = AdvisableSchema.execute(query, context:)

    success = response["data"]["flagProblematicSpecialist"]["success"]
    expect(success).to be(true)

    flag = ProblematicFlag.find_by(user:, application:)
    expect(flag.message).to eq(message)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("StaffMailer", "problematic_specialist", "deliver_now", {args: [flag]})
  end

  context "when application does not belong to user" do
    let(:another_user) { create(:user) }
    let(:context) { {current_user: another_user} }

    it "throws an error" do
      response = AdvisableSchema.execute(query, context:)

      error = response["errors"].first
      expect(error["message"]).to eq("The application does not belong to signed in user.")
    end
  end

  context "when not logged in as user" do
    let(:specialist) { create(:specialist) }
    let(:context) { {current_user: specialist} }

    it "throws an error" do
      response = AdvisableSchema.execute(query, context:)

      error = response["errors"].first
      expect(error["message"]).to eq("Current user must be a User.")
    end
  end
end
