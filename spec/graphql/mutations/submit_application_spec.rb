require "rails_helper"

describe Mutations::SubmitApplication do
  let(:application) { create(:application, applied_at: nil, status: "Invited To Apply") }
  let(:query) { %|
    mutation {
      submitApplication(input: {
        id: #{application.airtable_id},
      }) {
        application {
          id
          status
        }
        errors
      }
    }
  |}

  let(:context) { { current_user: application.specialist } }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the status to 'Proposed'" do
    response = AdvisableSchema.execute(query, context: context)
    status = response["data"]["submitApplication"]["application"]["status"]
    expect(status).to eq("Applied")
  end

  it "sets the applied at attribute" do
    expect(application.reload.applied_at).to be_nil
    AdvisableSchema.execute(query, context: context)
    expect(application.reload.applied_at).to_not be_nil
  end

  context "when the status is Applied" do
    let(:application) { create(:application, applied_at: nil, status: "Applied") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["submitApplication"]["errors"][0]
      expect(error).to match(/Cannot submit application with status/)
    end
  end
end