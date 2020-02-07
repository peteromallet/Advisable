require 'rails_helper'

describe Mutations::DeleteTask do
  let!(:user) { create(:user) }
  let!(:specialist) { create(:specialist) }
  let!(:project) { create(:project, user: user) }
  let!(:application) do
    create(:application, specialist: specialist, project: project)
  end
  let!(:task) { create(:task, application: application, stage: 'Not Assigned') }
  let(:query) do
    <<-GRAPHQL
    mutation {
      deleteTask(input: {
        task: "#{task.uid}",
      }) {
        task {
          id
        }
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Task).to receive(:remove_from_airtable)
  end

  context 'when a user is signed in' do
    it 'deletes the task' do
      expect {
        AdvisableSchema.execute(query, context: { current_user: user })
      }.to change { Task.count }.by(-1)
    end
  end

  context 'when there is no user signed in' do
    it 'responds with a not_authorized error code' do
      response = AdvisableSchema.execute(query, context: { current_user: nil })
      errors = response['data']['deleteTask']['errors']
      expect(errors[0]['code']).to eq('not_authorized')
    end
  end

  context "when the stage is 'Assigned'" do
    let(:task) { create(:task, application: application, stage: 'Assigned') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: { current_user: user })
      errors = response['data']['deleteTask']['errors']
      expect(errors[0]['code']).to eq('tasks.cantDeleteAssigned')
    end
  end
end
