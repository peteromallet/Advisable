require "rails_helper"

describe Mutations::RequestToStart do
  let(:application) { create(:application, status: "Working") }
  let(:task) { create(:task, stage: "Not Assigned", application: application) }

  let(:query) { %|
    mutation {
      requestToStart(input: {
        task: #{task.uid},
      }) {
        task {
          id
          stage
        }
        errors {
          code
          message
        }
      }
    }
  |}

  let(:context) { { current_user: task.application.specialist } }

  before :each do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it "sets the stage to 'Requested To Start'" do
    response = AdvisableSchema.execute(query, context: context)
    stage = response["data"]["requestToStart"]["task"]["stage"]
    expect(stage).to eq("Requested To Start")
  end

  it "triggers a webhook" do
    expect(WebhookEvent).to receive(:trigger).with("tasks.requested_to_start", any_args)
    AdvisableSchema.execute(query, context: context)
  end

  context "when the task does not have a name" do
    let(:task) { create(:task, stage: "Not Assigned", name: nil) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["requestToStart"]["errors"][0]
      expect(error["code"]).to eq("tasks.nameRequired")
    end
  end

  context "when the task does not have a description" do
    let(:task) { create(:task, stage: "Not Assigned", description: nil) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["requestToStart"]["errors"][0]
      expect(error["code"]).to eq("tasks.descriptionRequired")
    end
  end


  context "when the specialist doesn't have access to the project" do
    let(:context) {{ current_user: create(:user) }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["requestToStart"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when there is no user" do
    let(:context) {{ current_user: nil }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["requestToStart"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when the user is logged in" do
    let(:context) {{ current_user: task.application.project.user }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["requestToStart"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when the task stage is Assigned" do
    let(:task) { create(:task, stage: "Assigned") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["requestToStart"]["errors"][0]
      expect(error["code"]).to eq("tasks.cantRequestToStart")
    end
  end

  context "when the task stage is Working" do
    let(:task) { create(:task, stage: "Working") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["requestToStart"]["errors"][0]
      expect(error["code"]).to eq("tasks.cantRequestToStart")
    end
  end

  context "when the task stage is Submitted" do
    let(:task) { create(:task, stage: "Submitted") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["requestToStart"]["errors"][0]
      expect(error["code"]).to eq("tasks.cantRequestToStart")
    end
  end

  context "when the application status is not 'Working'" do
    let(:application) { create(:application, status: "Proposed") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["requestToStart"]["errors"][0]
      expect(error["message"]).to eq("Application status is not 'Working'")
    end
  end
end