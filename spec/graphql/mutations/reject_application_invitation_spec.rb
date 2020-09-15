require 'rails_helper'

RSpec.describe Mutations::RejectApplicationInvitation do
  let(:application) { create(:application, invitation_rejection_reason: nil) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      rejectApplicationInvitation(input: {
        id: "#{application.airtable_id}",
        reason: "Not a good fit"
      }) {
        application {
          status
        }
        errors
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the status to 'Invitation Rejected'" do
    response = AdvisableSchema.execute(query, context: {})
    status =
      response['data']['rejectApplicationInvitation']['application']['status']
    expect(status).to eq('Invitation Rejected')
  end

  it 'sets the invitation_rejection_reason' do
    expect { AdvisableSchema.execute(query, context: {}) }.to change {
      application.reload.invitation_rejection_reason
    }.from(nil)
      .to('Not a good fit')
  end
end
