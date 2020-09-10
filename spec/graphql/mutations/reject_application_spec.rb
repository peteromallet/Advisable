require 'rails_helper'

describe Mutations::RejectApplication do
  let(:application) { create(:application) }
  let(:query) do
    <<-GRAPHQL
      mutation {
        rejectApplication(input: {
          id: "#{application.uid}",
          reason: "Too Expensive",
          comment: "This is a comment"
        }) {
          application {
            id
            status
          }
        }
      }
    GRAPHQL
  end

  let(:context) { { current_user: application.project.user } }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  def response
    AdvisableSchema.execute(query, context: context)
  end

  it 'sets the status to ApplicationRejected' do
    application = response['data']['rejectApplication']['application']
    expect(application['status']).to eq('Application Rejected')
  end

  context 'when not logged in' do
    let(:context) { { current_user: nil } }

    it 'returns an error if the user is not logged in' do
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthenticated')
    end
  end

  context 'when logged in as a random user' do
    let(:context) { { current_user: create(:user) } }

    it 'returns an error if the user is not logged in' do
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end
end
