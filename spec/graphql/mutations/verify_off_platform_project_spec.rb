require 'rails_helper'

describe Mutations::VerifyOffPlatformProject do
  let(:validation_status) { "Pending" }
  let(:project) { create(:off_platform_project, validation_status: validation_status) }
  
  let(:query) { %|
    mutation {
      verifyOffPlatformProject(input: {
        id: #{project.uid},
        email: "test@test.com"
      }) {
        offPlatformProject {
          validationStatus
        }
      }
    }
  |}

  before :each do
    allow_any_instance_of(OffPlatformProject).to receive(:sync_to_airtable)
  end

  context "when the validation status is 'Pending'" do
    it "sets the validation status to 'In Progress'" do
      expect {
        response = AdvisableSchema.execute(query)
      }.to change {
        project.reload.validation_status
      }.from("Pending").to("In Progress")
    end
    
    it "sets the contact email to 'test@test.com'" do
      expect {
        response = AdvisableSchema.execute(query)
      }.to change {
        project.reload.contact_email
      }.from(nil).to("test@test.com")
    end
  end

  context "when the validation status is not 'Pending'" do
    let(:validation_status) { "In Progress" }
    it "raises an error" do
      response = AdvisableSchema.execute(query)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("validationStatusNotPending")
    end
  end
end