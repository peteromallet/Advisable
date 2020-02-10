require 'rails_helper'

describe Mutations::StopWorking do
  let(:application) { create(:application, status: 'Working') }
  let(:context) { { current_user: application.project.user } }
  let(:query) do
    <<-GRAPHQL
    mutation {
      stopWorking(input: {
        application: "#{application.uid}",
        reason: "Becuase"
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
  end

  it "sets the status to 'Stopped Working'" do
    expect {
      response = AdvisableSchema.execute(query, context: context)
    }.to change { application.reload.status }.from('Working').to(
      'Stopped Working'
    )
  end

  it "sets the stopped_working_reason to 'Because'" do
    expect {
      response = AdvisableSchema.execute(query, context: context)
    }.to change { application.reload.stopped_working_reason }.from(nil).to(
      'Becuase'
    )
  end

  context 'when logged in as a random user' do
    let(:context) { { current_user: create(:user) } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context 'when logged in as the specialist' do
    let(:context) { { current_user: application.specialist } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context "when the application status is not 'Working'" do
    let(:application) { create(:application, status: 'Applied') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('applicationStatusNotWorking')
    end
  end
end
