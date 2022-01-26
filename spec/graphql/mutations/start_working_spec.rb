# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::StartWorking do
  let(:application) { create(:application, status: "Applied", project_type: nil) }
  let(:project_type) { "Fixed" }
  let(:monthly_limit) { 150 }
  let(:context) { {current_user: application.project.user} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      startWorking(input: {
        application: "#{application.uid}",
        projectType: "#{project_type}",
        monthlyLimit: #{monthly_limit}
      }) {
        application {
          id
          status
        }
      }
    }
    GRAPHQL
  end

  it "sets all the attributes" do
    expect(application.started_working_at).to be_nil
    AdvisableSchema.execute(query, context:)

    application.reload
    expect(application.status).to eq("Working")
    expect(application.started_working_at).not_to be_nil
    expect(application.project_type).to eq("Fixed")
  end

  context "when an invalid project type is passed" do
    let(:project_type) { "Invalid" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("INVALID_PROJECT_TYPE")
    end
  end

  context "when a user is signed in" do
    context "when the user owns the project" do
      it "sets the status to 'Working'" do
        response = AdvisableSchema.execute(query, context:)
        status = response["data"]["startWorking"]["application"]["status"]
        expect(status).to eq("Working")
      end
    end

    context "when the user does not have access to the project" do
      let(:context) { {current_user: create(:user)} }

      it "returns a not_authorized error" do
        response = AdvisableSchema.execute(query, context:)
        error = response["errors"][0]["extensions"]["code"]
        expect(error).to eq("NOT_AUTHORIZED")
      end
    end
  end

  context "when there is no user signed in" do
    let(:context) { {current_user: nil} }

    it "returns a not_authorized error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end
end
