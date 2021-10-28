# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ScheduleAdvisableApplicationInterview do
  let(:application_stage) { "Invited To Interview" }
  let!(:specialist) { create(:specialist, application_stage: application_stage) }
  let(:current_user) { specialist }
  let(:query) do
    <<-GRAPHQL
    mutation {
      scheduleAdvisableApplicationInterview(input: {
        eventId: "test"
      }) {
        specialist {
          id
        }
      }
    }
    GRAPHQL
  end

  let(:request) do
    AdvisableSchema.execute(query, context: {current_user: current_user})
  end

  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it 'sets the specialist application stage to "Interview Scheduled"' do
    expect { request }.to change {
      specialist.reload.application_stage
    }.from("Invited To Interview").to("Interview Scheduled")
  end

  context "when specialist application_stage is not 'Invited To Interview'" do
    let(:application_stage) { "Interview Scheduled" }

    it "returns an error" do
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("INVALID_APPLICATION_STAGE")
    end
  end

  context "when not authenticated" do
    let(:current_user) { nil }

    it "returns an error" do
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end
end
