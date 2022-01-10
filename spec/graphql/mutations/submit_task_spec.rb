# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::SubmitTask do
  let(:application) { create(:application, status: "Working") }
  let(:task) { create(:task, stage: "Working", application:) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      submitTask(input: {
        task: "#{task.uid}",
      }) {
        task {
          id
          stage
        }
      }
    }
    GRAPHQL
  end

  let(:context) { {current_user: task.application.specialist} }

  it "sets the stage to 'Submitted'" do
    response = AdvisableSchema.execute(query, context:)
    stage = response["data"]["submitTask"]["task"]["stage"]
    expect(stage).to eq("Submitted")
  end

  context "when the specialist doesn't have access to the project" do
    let(:context) { {current_user: create(:specialist)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NOT_AUTHORIZED")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NOT_AUTHORIZED")
    end
  end

  context "when the client is logged in" do
    let(:context) { {current_user: task.application.project.user} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NOT_AUTHORIZED")
    end
  end

  context "when the task stage is Quote Provided" do
    let(:task) { create(:task, stage: "Quote Provided") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("tasks.notSubmittable")
    end
  end

  context "when the task stage is Submitted" do
    let(:task) { create(:task, stage: "Submitted") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("tasks.notSubmittable")
    end
  end

  context "when the application status is not 'Working'" do
    let(:application) { create(:application, status: "Proposed") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]
      expect(error["message"]).to eq("Application status is not 'Working'")
    end
  end
end
