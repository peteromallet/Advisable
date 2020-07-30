require 'rails_helper'

describe Mutations::SubmitFullApplication do
  let(:specialist) { create(:specialist, application_stage: 'On Hold') }

  let(:query) do
    <<-GRAPHQL
    mutation {
      submitFullApplication(input: {}) {
        specialist {
          id
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it 'Sets their application status to "Full Application"' do
    expect {
      AdvisableSchema.execute(query, context: { current_user: specialist })
    }.to change { specialist.reload.application_stage }.from('On Hold').to(
      'Full Application'
    )
  end

  context 'When not logged in' do
    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: { current_user: nil })
      error = response['errors'].first['extensions']['type']
      expect(error).to eq('NOT_AUTHENTICATED')
    end
  end

  context 'When logged in as a user' do
    it 'returns an error' do
      response =
        AdvisableSchema.execute(query, context: { current_user: create(:user) })
      error = response['errors'].first['extensions']['type']
      expect(error).to eq('NOT_AUTHENTICATED')
    end
  end

  context 'When their application_stage is not On Hold' do
    let(:specialist) { create(:specialist, application_stage: 'Accepted') }

    it 'responds with an error' do
      response =
        AdvisableSchema.execute(query, context: { current_user: specialist })
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('invalidApplicationStage')
    end
  end
end
