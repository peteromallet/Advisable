require 'rails_helper'

describe Mutations::DeleteTask do
  let(:user) { create(:user) }
  let!(:project) { create(:project, user: user, status: :draft) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      deleteJob(input: {
        id: "#{project.uid}",
      }) {
        id
      }
    }
    GRAPHQL
  end

  context 'when a user is signed in' do
    it 'deletes the project' do
      expect {
        AdvisableSchema.execute(query, context: { current_user: user })
      }.to change { user.projects.count }.by(-1)
    end
  end

  context 'when there is no user signed in' do
    it 'responds with a not_authenticated error code' do
      response = AdvisableSchema.execute(query, context: { current_user: nil })
      error = response['errors'].first['extensions']['type']
      expect(error).to eq('NOT_AUTHENTICATED')
    end
  end

  context 'when the user is not the project owner' do
    it 'responds with a not_authenticated error code' do
      response =
        AdvisableSchema.execute(query, context: { current_user: create(:user) })
      error = response['errors'].first['extensions']['type']
      expect(error).to eq('NOT_AUTHORIZED')
    end
  end

  context 'wen the project status is not draft' do
    let(:project) { create(:project, user: user, status: 'Brief Confirmed') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: { current_user: user })
      error = response['errors'].first['extensions']['type']
      expect(error).to eq('INVALID_REQUEST')
    end
  end
end
