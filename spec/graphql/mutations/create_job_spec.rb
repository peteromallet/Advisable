require 'rails_helper'

describe Mutations::CreateJob do
  let(:user) { create(:user) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createJob(input: {}) {
        project {
          id
        }
      }
    }
    GRAPHQL
  end

  context 'when a user is signed in' do
    it 'creates a project' do
      expect {
        AdvisableSchema.execute(query, context: { current_user: user })
      }.to change { user.projects.count }.by(1)
    end
  end

  context 'when there is no user signed in' do
    it 'responds with a not_authenticated error code' do
      response = AdvisableSchema.execute(query, context: { current_user: nil })
      error = response['errors'].first['extensions']['type']
      expect(error).to eq('NOT_AUTHENTICATED')
    end
  end
end
