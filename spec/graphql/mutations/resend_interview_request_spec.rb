# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ResendInterviewRequest do
  let(:user) { create(:user, availability: []) }
  let(:current_user) { user }
  let(:context) { {current_user: current_user} }
  let(:interview) { create(:interview, status: "Need More Time Options", time_zone: "Perth", user: user) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      resendInterviewRequest(input: {
        id: "#{interview.uid}",
      }) {
        interview {
          status
          timeZone
          user {
            availability
          }
        }
      }
    }
    GRAPHQL
  end

  it "sets the status to 'More Time Options Added'" do
    response = AdvisableSchema.execute(query, context: context)
    status = response["data"]["resendInterviewRequest"]["interview"]["status"]
    expect(status).to eq("More Time Options Added")
    expect(interview.reload.more_time_options_added_at).to be_within(1.second).of(Time.zone.now)
  end

  context "when a Service::Error is thrown" do
    it "includes it in the response" do
      allow_any_instance_of(Interview).to receive(:save).and_return(false)
      response = AdvisableSchema.execute(query, context: context)
      message = response["errors"].first["message"]
      expect(message).to eq("FAILED_TO_RESEND")
    end
  end

  context "when logged in user is a specialist" do
    let(:current_user) { interview.specialist }

    it "sets the status to 'More Time Options Added'" do
      response = AdvisableSchema.execute(query, context: context)
      status = response["data"]["resendInterviewRequest"]["interview"]["status"]
      expect(status).to eq("More Time Options Added")
      expect(interview.reload.more_time_options_added_at).to be_within(1.second).of(Time.zone.now)
    end
  end

  context "when logged in user is a different specialist" do
    let(:current_user) { create(:specialist) }

    it "raises an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when logged in user is a different user" do
    let(:current_user) { create(:user) }

    it "raises an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when not logged in" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      expect(response["errors"][0]["extensions"]["type"]).to eq("NOT_AUTHENTICATED")
    end
  end
end
