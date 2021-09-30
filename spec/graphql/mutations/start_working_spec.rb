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

  before do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets all the attributes and creates previous project" do
    expect(application.previous_project).to be_nil

    AdvisableSchema.execute(query, context: context)

    application.reload
    expect(application.status).to eq("Working")
    expect(application.project_type).to eq("Fixed")
    expect(application.previous_project).not_to be_nil
  end

  context "when an invalid project type is passed" do
    let(:project_type) { "Invalid" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("INVALID_PROJECT_TYPE")
    end
  end

  context "when a user is signed in" do
    context "when the user owns the project" do
      it "sets the status to 'Working'" do
        response = AdvisableSchema.execute(query, context: context)
        status = response["data"]["startWorking"]["application"]["status"]
        expect(status).to eq("Working")
      end
    end

    context "when the user does not have access to the project" do
      let(:context) { {current_user: create(:user)} }

      it "returns a not_authorized error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"][0]["extensions"]["code"]
        expect(error).to eq("notAuthorized")
      end
    end
  end

  context "when there is no user signed in" do
    let(:context) { {current_user: nil} }

    it "returns a not_authorized error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end
end
