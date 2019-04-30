require "rails_helper"

describe Mutations::ApproveTask do
  let(:task) { create(:task, stage: "Submitted") }

  let(:query) { %|
    mutation {
      approveTask(input: {
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

  let(:context) { { current_user: task.application.project.user } }

  before :each do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it "sets the stage to 'Approved'" do
    response = AdvisableSchema.execute(query, context: context)
    stage = response["data"]["approveTask"]["task"]["stage"]
    expect(stage).to eq("Approved")
  end

  it "triggers a webhook" do
    expect(WebhookEvent).to receive(:trigger).with("tasks.approved", any_args)
    AdvisableSchema.execute(query, context: context)
  end

  context "when the user doesn't have access to the project" do
    let(:context) {{ current_user: create(:user) }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["approveTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when there is no user" do
    let(:context) {{ current_user: nil }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["approveTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when the specialist is logged in" do
    let(:context) {{ current_user: task.application.specialist }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["approveTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when the task stage is not Submitted" do
    let(:task) { create(:task, stage: "Assigned") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["approveTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.statusNotSubmitted")
    end
  end
end