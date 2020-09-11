require 'rails_helper'

describe Mutations::RequestApplicationCallback do
  let(:application_status) { :accepted }
  let(:user) { create(:user, application_status: application_status) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        requestApplicationCallback(input: {
          id: "#{user.uid}",
          phoneNumber: "0861234567"
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:response) { AdvisableSchema.execute(query) }

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(ClientCall).to receive(:sync_to_airtable)
  end

  it 'creates a call' do
    expect { response }.to change { user.reload.client_calls.count }.by(1)
  end

  it 'sets the contact_status to Call Scheduled' do
    expect { response }.to change { user.reload.contact_status }.to(
      'Call Scheduled'
    )
  end

  context 'when the application status is not accepted' do
    let(:application_status) { :rejected }

    it 'returns an error' do
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAccepted')
    end
  end
end
