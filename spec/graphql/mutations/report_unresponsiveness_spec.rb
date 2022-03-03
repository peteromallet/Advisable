# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ReportUnresponsiveness do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:application) { create(:application, specialist:) }
  let(:message) { "This guy. I mean. COME ON!" }

  let(:query) do
    <<-GRAPHQL
    mutation {
      reportUnresponsiveness(input: {
        applicationId: "#{application.uid}",
        message: "#{message}"
      }) {
        success
      }
    }
    GRAPHQL
  end

  context "when logged in as client" do
    let(:context) { {current_user: user} }

    it "creates the report and schedules the mailer" do
      response = AdvisableSchema.execute(query, context:)

      success = response["data"]["reportUnresponsiveness"]["success"]
      expect(success).to be(true)

      report = UnresponsivenessReport.find_by(reporter: user.account, application:)
      expect(report.message).to eq(message)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("StaffMailer", "unresponsive_specialist", "deliver_now", {args: [report]})
    end

    context "when application does not belong to client" do
      let(:another_user) { create(:user) }
      let(:context) { {current_user: another_user} }

      it "throws an error" do
        response = AdvisableSchema.execute(query, context:)

        error = response["errors"].first
        expect(error["message"]).to eq("The application does not belong to signed in user.")
      end
    end
  end

  context "when logged in as specialist" do
    let(:context) { {current_user: specialist} }

    it "creates the report and schedules the mailer" do
      response = AdvisableSchema.execute(query, context:)

      success = response["data"]["reportUnresponsiveness"]["success"]
      expect(success).to be(true)

      report = UnresponsivenessReport.find_by(reporter: specialist.account, application:)
      expect(report.message).to eq(message)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("StaffMailer", "unresponsive_client", "deliver_now", {args: [report]})
    end

    context "when application does not belong to specialist" do
      let(:another_specialist) { create(:specialist) }
      let(:context) { {current_user: another_specialist} }

      it "throws an error" do
        response = AdvisableSchema.execute(query, context:)

        error = response["errors"].first
        expect(error["message"]).to eq("The application does not belong to signed in user.")
      end
    end
  end
end
