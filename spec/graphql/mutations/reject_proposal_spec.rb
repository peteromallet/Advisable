require "rails_helper"

describe Mutations::RejectProposal do
  let(:application) {
    create(:application, {
      status: "Proposed",
      rejection_reason: nil
    })
  }

  let(:query) { %|
    mutation {
      rejectProposal(input: {
        id: #{application.airtable_id},
        reason: "This is the rejection reason",
        comment: "This is the rejection comment"
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

  it "sets the status to 'Application Rejected'" do
    response = AdvisableSchema.execute(query, context: context)
    status = response["data"]["rejectProposal"]["application"]["status"]
    expect(status).to eq("Application Rejected")
  end

  it "triggers a webhook" do
    expect(WebhookEvent).to receive(:trigger).with("applications.proposal_rejected", any_args)
    AdvisableSchema.execute(query, context: context)
  end

  it 'sets the rejection_reason' do
    expect {
      AdvisableSchema.execute(query, context: context)
    }.to change {
      application.reload.rejection_reason
    }.from(nil).to("This is the rejection reason")
  end

  it 'sets the rejection_reason_comment' do
    expect {
      AdvisableSchema.execute(query, context: context)
    }.to change {
      application.reload.rejection_reason_comment
    }.from(nil).to("This is the rejection comment")
  end

  context "when there is no logged in user" do
    let(:context) {{ current_user: nil }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      errors = response["data"]["rejectProposal"]["errors"]
      expect(errors[0]["code"]).to eq("not_authorized")
    end
  end

  context "when the application status is not Proposed" do
    let(:application) { create(:application, status: "Accepted") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      errors = response["data"]["rejectProposal"]["errors"]
      expect(errors[0]["code"]).to eq("applications.notProposed")
    end
  end
end