# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::RequestMoreInterviewTimes do
  let(:specialist) { create(:specialist) }
  let(:user) { create(:user) }
  let(:current_user) { specialist }
  let(:context) { {current_user:} }
  let(:interview) { create(:interview, accounts: [specialist.account, user.account], status: "Call Requested") }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestMoreInterviewTimes(input: {
        id: "#{interview.uid}",
        availabilityNote: "This is a note",
      }) {
        interview {
          status
        }
      }
    }
    GRAPHQL
  end

  let(:response) { AdvisableSchema.execute(query, context:) }

  it "sets the status to 'Need More Time Options'" do
    status = response["data"]["requestMoreInterviewTimes"]["interview"]["status"]
    expect(status).to eq("Need More Time Options")
  end

  it "sets requested_more_time_options_at" do
    response
    expect(interview.reload.requested_more_time_options_at).to be_within(1.second).of(Time.zone.now)
  end

  it "sends the email to the user" do
    response
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "need_more_time_options", "deliver_now", {args: [interview]})
  end

  context "when the status is not 'Call Requested'" do
    let(:interview) { create(:interview, accounts: [specialist.account, user.account], status: "Call Completed") }

    it "returns an error" do
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("interview.notRequested")
    end
  end

  context "when logged in user is a specialist" do
    let(:current_user) { interview.specialist }

    it "sets the status to 'Need More Time Options'" do
      status = response["data"]["requestMoreInterviewTimes"]["interview"]["status"]
      expect(status).to eq("Need More Time Options")
    end
  end

  context "when logged in user is a different specialist" do
    let(:current_user) { create(:specialist) }

    it "raises an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when logged in user is a different user" do
    let(:current_user) { create(:user) }

    it "raises an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when not logged in" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      expect(response["errors"][0]["extensions"]["type"]).to eq("NOT_AUTHENTICATED")
    end
  end
end
