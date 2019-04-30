require "rails_helper"

describe Mutations::SubmitTask do
  let(:task) { create(:task, stage: "Working") }

  let(:query) { %|
    mutation {
      submitTask(input: {
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

  it "sets the stage to 'Submitted'" do
    response = AdvisableSchema.execute(query, context: context)
    stage = response["data"]["submitTask"]["task"]["stage"]
    expect(stage).to eq("Submitted")
  end

  it "triggers a webhook" do
    expect(WebhookEvent).to receive(:trigger).with("tasks.submitted", any_args)
    AdvisableSchema.execute(query, context: context)
  end

  context "when the specialist doesn't have access to the project" do
    let(:context) {{ current_user: create(:specialist) }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["submitTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when there is no user" do
    let(:context) {{ current_user: nil }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["submitTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when the client is logged in" do
    let(:context) {{ current_user: task.application.project.user }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["submitTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when the task stage is Quote Provided" do
    let(:task) { create(:task, stage: "Quote Provided") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["submitTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.mustBeWorking")
    end
  end

  context "when the task stage is Submitted" do
    let(:task) { create(:task, stage: "Submitted") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["submitTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.mustBeWorking")
    end
  end
end