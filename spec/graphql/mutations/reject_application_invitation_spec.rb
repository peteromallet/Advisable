# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::RejectApplicationInvitation do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:context) { {current_user:} }
  let(:application) { create(:application, specialist:, status: "Invited To Apply", invitation_rejection_reason: nil) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      rejectApplicationInvitation(input: {
        id: "#{application.uid}",
        reason: "Not a good fit"
      }) {
        application {
          status
        }
      }
    }
    GRAPHQL
  end

  it "sets the status to 'Invitation Rejected'" do
    response = AdvisableSchema.execute(query, context:)
    status = response["data"]["rejectApplicationInvitation"]["application"]["status"]
    expect(status).to eq("Invitation Rejected")
  end

  it "sets the invitation_rejection_reason" do
    expect { AdvisableSchema.execute(query, context:) }.to change {
      application.reload.invitation_rejection_reason
    }.from(nil).to("Not a good fit")
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
