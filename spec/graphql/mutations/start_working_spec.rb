require 'rails_helper'

describe Mutations::StartWorking do
  let!(:application) { create(:application) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      startWorking(input: {
        application: "#{application.airtable_id}",
        projectType: "Fixed"
      }) {
        application {
          id
          status
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    allow_any_instance_of(PreviousProject).to receive(:sync_to_airtable)
  end

  context 'when a user is signed in' do
    context 'and the user owns the project' do
      let(:context) { { current_user: application.project.user } }
      let(:response) { AdvisableSchema.execute(query, context: context) }

      it "sets the status to 'Working'" do
        status = response['data']['startWorking']['application']['status']
        expect(status).to eq('Working')
      end
    end

    context 'and the user does not have access to the project' do
      let(:context) { { current_user: create(:user) } }
      let(:response) { AdvisableSchema.execute(query, context: context) }

      it 'returns a not_authorized error' do
        error = response['errors'][0]['extensions']['code']
        expect(error).to eq('notAuthorized')
      end
    end
  end

  context 'when there is no user signed in' do
    let(:context) { { current_user: nil } }
    let(:response) { AdvisableSchema.execute(query, context: context) }

    it 'returns a not_authorized error' do
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end
end
