require 'rails_helper'

describe Mutations::VerifyPreviousProject do
  let(:validation_status) { 'Pending' }
  let(:project) do
    create(
      :previous_project,
      validation_status: validation_status, contact_name: 'Test Viewer'
    )
  end

  let(:oauth_viewer) do
    OauthViewer.new(
      {
        'uid' => '123',
        'name' => 'Test Viewer',
        'firstName' => 'Test',
        'lastName' => 'Viewer',
        'image' => '..',
        'provider' => 'linkedin'
      }
    )
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      verifyPreviousProject(input: {
        id: "#{project.uid}",
      }) {
        previousProject {
          id
          validationStatus
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(PreviousProject).to receive(:sync_to_airtable)
  end

  context "when the validation status is 'Pending'" do
    it "sets the validation status to 'Validated'" do
      expect {
        response =
          AdvisableSchema.execute(
            query,
            context: { oauth_viewer: oauth_viewer }
          )
      }.to change { project.reload.validation_status }.from('Pending').to(
        'Validated'
      )
    end
  end
end
