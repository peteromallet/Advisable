require 'rails_helper'

RSpec.describe Mutations::CompleteSetup do
  let(:specialist) { create(:specialist, application_stage: 'Started') }

  let(:query) do
    <<-GRAPHQL
      mutation {
        completeSetup(input: {}) {
          specialist {
            id
            applicationStage
          }
        }
      }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it "Sets the applicationStage to 'On Hold'" do
    response =
      AdvisableSchema.execute(query, context: { current_user: specialist })
    status = response['data']['completeSetup']['specialist']['applicationStage']
    expect(status).to eq('On Hold')
  end

  context 'when there is no viewer' do
    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: { current_user: nil })
      error_code = response['errors'][0]['extensions']['code']
      expect(error_code).to eq('notAuthenticated')
    end
  end

  context 'when there is a User logged in' do
    it 'returns an error' do
      response =
        AdvisableSchema.execute(query, context: { current_user: create(:user) })
      error_code = response['errors'][0]['extensions']['code']
      expect(error_code).to eq('notAuthenticated')
    end
  end

  context "when the applicationStage is not 'Started'" do
    let(:specialist) { create(:specialist, application_stage: 'Accepted') }

    it 'returns an error' do
      response =
        AdvisableSchema.execute(query, context: { current_user: specialist })
      error_code = response['errors'][0]['extensions']['code']
      expect(error_code).to eq('invalidApplicationStage')
    end
  end
end
