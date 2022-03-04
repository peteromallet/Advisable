# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::AcceptConsultation do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:consultation) { create(:consultation, specialist:, status: "Request Completed") }
  let(:context) { {current_user:} }

  let(:query) do
    <<-GRAPHQL
      mutation {
        acceptConsultation(input: {
          consultation: "#{consultation.uid}"
        }) {
          interview {
            id
          }
        }
      }
    GRAPHQL
  end

  it "Sets the consultation status to 'Accepted By Specialist'" do
    expect { AdvisableSchema.execute(query, context:) }.to change {
      consultation.reload.status
    }.from("Request Completed").to("Accepted By Specialist")
  end

  it "creates an interview" do
    response = AdvisableSchema.execute(query, context:)
    interview_id = response["data"]["acceptConsultation"]["interview"]["id"]
    interview = Interview.find_by(uid: interview_id)
    expect(interview.attributes.slice("user_id", "specialist_id", "status").values).to match_array(["Call Requested", consultation.specialist.id, consultation.user_id])
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_SPECIALIST")
    end
  end
end
