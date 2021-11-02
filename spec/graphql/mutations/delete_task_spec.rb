# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::DeleteTask do
  let!(:user) { create(:user) }
  let!(:specialist) { create(:specialist) }
  let!(:project) { create(:project, user: user) }
  let!(:application) { create(:application, specialist: specialist, project: project) }
  let!(:task) { create(:task, application: application, stage: "Not Assigned") }
  let(:query) do
    <<-GRAPHQL
    mutation {
      deleteTask(input: {
        task: "#{task.uid}",
      }) {
        task {
          id
        }
      }
    }
    GRAPHQL
  end

  context "when a user is signed in" do
    it "deletes the task" do
      expect(task.reload.stage).not_to eq("Deleted")
      AdvisableSchema.execute(query, context: {current_user: user})
      expect(task.reload.stage).to eq("Deleted")
    end
  end

  context "when there is no user signed in" do
    it "responds with a not_authorized error code" do
      response = AdvisableSchema.execute(query, context: {current_user: nil})
      error = response["errors"][0]
      expect(error["extensions"]["type"]).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when the stage is 'Assigned'" do
    let(:task) { create(:task, application: application, stage: "Assigned") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: {current_user: user})
      error = response["errors"][0]
      expect(error["message"]).to eq("tasks.cantDeleteAssigned")
    end
  end
end
