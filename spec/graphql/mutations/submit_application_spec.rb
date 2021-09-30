# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::SubmitApplication do
  let(:specialist) { create(:specialist) }
  let(:project) { create(:project) }
  let(:status) { "Invited To Apply" }
  let(:application) { create(:application, specialist: specialist, project: project, status: status, applied_at: nil) }
  let(:context) { {current_user: specialist} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      submitApplication(input: {
        id: "#{application.uid}",
      }) {
        application {
          id
          status
        }
      }
    }
    GRAPHQL
  end

  before do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the status to 'Applied'" do
    response = AdvisableSchema.execute(query, context: context)
    status = response["data"]["submitApplication"]["application"]["status"]
    expect(status).to eq("Applied")
  end

  it "sets the applied at attribute" do
    expect(application.reload.applied_at).to be_nil
    AdvisableSchema.execute(query, context: context)
    expect(application.reload.applied_at).not_to be_nil
  end

  context "when the status is Application Rejected" do
    let(:status) { "Application Rejected" }

    it "allows the candidate to reapply" do
      response = AdvisableSchema.execute(query, context: context)
      status = response["data"]["submitApplication"]["application"]["status"]
      expect(status).to eq("Applied")
    end
  end

  context "when applications are closed" do
    let(:project) { create(:project, sales_status: "Lost") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["message"]).to eq("projects.applicationsClosed")
    end
  end

  context "when the status is Applied" do
    let(:status) { "Applied" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["message"]).to eq("applications.cannotSubmit")
    end
  end

  context "when provided application is not from the signed in user" do
    let(:application) { create(:application) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("INVALID_APPLICATION")
    end
  end
end
