require 'rails_helper'

RSpec.describe Mutations::SetTaskRepeat do
  let(:task) { create(:task, repeat: nil) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      setTaskRepeat(input: {
        id: "#{task.uid}",
        repeat: "Monthly"
      }) {
        task {
          id
          repeat
        }
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  let(:context) { { current_user: task.application.project.user } }

  before :each do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  it "sets repeat to 'Monthly'" do
    response = AdvisableSchema.execute(query, context: context)
    repeat = response['data']['setTaskRepeat']['task']['repeat']
    expect(repeat).to eq('Monthly')
  end

  context 'when there is no user' do
    let(:context) { { current_user: nil } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['setTaskRepeat']['errors'][0]
      expect(error['code']).to eq('not_authorized')
    end
  end
end
