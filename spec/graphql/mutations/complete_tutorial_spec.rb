require 'rails_helper'

describe Mutations::CompleteTutorial do
  let(:user) { create(:user, completed_tutorials: []) }
  let(:context) { { current_user: user } }

  let(:query) do
    <<-GRAPHQL
    mutation {
      completeTutorial(input: {
        tutorial: "fixedProjects",
      }) {
        viewer {
          ... on User {
            id
            completedTutorials
          }
        }
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  it 'marks the project as complete' do
    response = AdvisableSchema.execute(query, context: context)
    data = response['data']['completeTutorial']['viewer']['completedTutorials']
    expect(data).to eq(%w[fixedProjects])
    expect(user.reload.completed_tutorials).to include('fixedProjects')
  end

  context 'when there is no user logged in' do
    let(:context) { { current_user: nil } }

    it 'raises an error' do
      response = AdvisableSchema.execute(query, context: context)
      data = response['data']['completeTutorial']['errors'][0]['code']
      expect(data).to eq('notAuthenticated')
    end
  end
end
