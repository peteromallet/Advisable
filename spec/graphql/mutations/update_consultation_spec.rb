# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateConsultation do
  let(:user) { create(:user) }
  let(:current_user) { user }
  let(:context) { {current_user: current_user} }
  let(:consultation) { create(:consultation, user: user, status: "Request Started", topic: nil) }
  let(:topic) { "New topic" }
  let(:query) do
    <<~GQL
      mutation {
        updateConsultation(input: {
          id: "#{consultation.uid}",
          topic: "#{topic}"
        }) {
          consultation {
            id
            topic
          }
        }
      }
    GQL
  end

  before do
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
  end

  it "sets the topic" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      consultation.reload.topic
    }.from(nil).
      to("New topic")
  end

  context "when the status is 'Accepted by Specialist'" do
    it "returns an error" do
      consultation.update(status: "Accepted by Specialist")
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("CONSULTATIONS_FAILED_TO_UPDATE")
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end

  context "when the current user is a specialist" do
    let(:current_user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
    end
  end
end
