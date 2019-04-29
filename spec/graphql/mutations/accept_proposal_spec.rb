require "rails_helper"

describe Mutations::AcceptProposal do
  let(:application) { create(:application, status: "Proposed") }
  let(:query) { %|
    mutation {
      acceptProposal(input: {
        id: #{application.airtable_id},
      }) {
        application {
          id
          status
        }
        errors {
          code
        }
      }
    }
  |}

  let(:context) { { current_user: application.project.user } }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the status to 'Working'" do
    response = AdvisableSchema.execute(query, context: context)
    status = response["data"]["acceptProposal"]["application"]["status"]
    expect(status).to eq("Working")
  end

  it "triggers a webhook" do
    expect(WebhookEvent).to receive(:trigger).with("applications.proposal_accepted", any_args)
    AdvisableSchema.execute(query, context: context)
  end

  context "when there is no logged in user" do
    let(:context) {{ current_user: nil }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      errors = response["data"]["acceptProposal"]["errors"]
      expect(errors[0]["code"]).to eq("not_authorized")
    end
  end

  context "when the application status is not Proposed" do
    let(:application) { create(:application, status: "Accepted") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      errors = response["data"]["acceptProposal"]["errors"]
      expect(errors[0]["code"]).to eq("applications.notProposed")
    end
  end

  context "when a Service::Error is thrown" do
    it "includes it in the response" do
      error = Service::Error.new("service_error")
      allow(Proposals::Accept).to receive(:call).and_raise(error)
      response = AdvisableSchema.execute(query, context: context)
      errors = response["data"]["acceptProposal"]["errors"]
      expect(errors[0]["code"]).to eq("service_error")
    end
  end
end