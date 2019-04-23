require "rails_helper"

describe Mutations::RejectApplication do
  let(:application) { create(:application) }
  let(:query) { %|
    mutation {
      rejectApplication(input: {
        id: #{application.airtable_id},
        rejectionReason: "Too Expensive",
        rejectionReasonComment: "This is a comment"
      }) {
        application {
          id
          status
        }
        errors
      }
    }
  |}

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the status to ApplicationRejected" do
    response = AdvisableSchema.execute(query, context: {})
    application = response["data"]["rejectApplication"]["application"]
    expect(application["status"]).to eq("Application Rejected")
  end


end