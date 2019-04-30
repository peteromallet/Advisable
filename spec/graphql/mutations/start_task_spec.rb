require "rails_helper"

describe Mutations::StartTask do
  let(:task) { create(:task, stage: "Assigned") }

  let(:query) { %|
    mutation {
      startTask(input: {
        task: #{task.uid},
      }) {
        task {
          id
          stage
        }
        errors {
          code
        }
      }
    }
  |}

  let(:context) { { current_user: task.application.specialist } }

  before :each do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it "sets the stage to 'Working'" do
    response = AdvisableSchema.execute(query, context: context)
    stage = response["data"]["startTask"]["task"]["stage"]
    expect(stage).to eq("Working")
  end

  it "triggers a webhook" do
    expect(WebhookEvent).to receive(:trigger).with("tasks.started", any_args)
    AdvisableSchema.execute(query, context: context)
  end

  context "when the task does not have an estimate" do
    let(:task) { create(:task, stage: "Assigned", estimate: nil) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["startTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.estimateRequired")
    end
  end

  context "when the task does not have a due date" do
    let(:task) { create(:task, stage: "Assigned", due_date: nil) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["startTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.dueDateRequired")
    end
  end

  context "when the specialist doesn't have access to the project" do
    let(:context) {{ current_user: create(:specialist) }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["startTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when there is no user" do
    let(:context) {{ current_user: nil }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["startTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when the client is logged in" do
    let(:context) {{ current_user: task.application.project.user }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["startTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when the task stage is Quote Provided" do
    let(:task) { create(:task, stage: "Quote Provided") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["startTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.mustBeAssigned")
    end
  end

  context "when the task stage is Working" do
    let(:task) { create(:task, stage: "Working") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["startTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.mustBeAssigned")
    end
  end

  context "when the task stage is Submitted" do
    let(:task) { create(:task, stage: "Submitted") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["startTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.mustBeAssigned")
    end
  end
end