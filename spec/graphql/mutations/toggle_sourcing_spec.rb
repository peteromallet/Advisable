require 'rails_helper'

RSpec.describe Mutations::ToggleSourcing do
  let(:sourcing) { false }
  let(:project) { create(:project, sourcing: sourcing) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      toggleSourcing(input: {
        project: "#{project.uid}",
      }) {
        project {
          id
          sourcing
        }
      }
    }
    GRAPHQL
  end

  let(:context) { { current_user: project.user } }

  context 'when sourcing is false' do
    let(:sourcing) { false }

    it 'toggles the sourcing attribute to true' do
      expect { AdvisableSchema.execute(query, context: context) }.to change {
        project.reload.sourcing
      }.from(false).to(true)
    end
  end

  context 'when sourcing is true' do
    let(:sourcing) { true }

    it 'toggles the sourcing attribute to false' do
      expect { AdvisableSchema.execute(query, context: context) }.to change {
        project.reload.sourcing
      }.from(true).to(false)
    end
  end

  context 'when not logged in' do
    let(:context) { { current_user: nil } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthenticated')
    end
  end

  context 'when logged in as a random user' do
    let(:context) { { current_user: create(:user) } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end
end
