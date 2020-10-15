require 'rails_helper'

RSpec.describe Mutations::CompleteTutorial do
  let(:account) { create(:account, completed_tutorials: []) }
  let!(:user) { create(:user, account: account) }
  let(:context) { {current_user: user} }

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
    let(:context) { {current_user: nil} }

    it 'raises an error' do
      response = AdvisableSchema.execute(query, context: context)
      data = response['errors'][0]['extensions']['code']
      expect(data).to eq('notAuthenticated')
    end
  end
end
