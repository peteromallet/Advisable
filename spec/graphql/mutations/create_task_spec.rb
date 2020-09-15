require 'rails_helper'

RSpec.describe Mutations::CreateTask do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:project) { create(:project, user: user) }
  let(:application) do
    create(:application, specialist: specialist, project: project)
  end
  let(:context) { { current_user: user } }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createTask(input: {
        id: "#{Task.generate_uid}",
        application: "#{application.airtable_id}",
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
    allow_any_instance_of(Airtable::Task).to receive(:create)
  end

  context 'when a user is signed in' do
    it 'creates a new task' do
      expect(response['data']['createTask']['task']).to_not be_nil
    end

    it 'triggers a webhook' do
      expect(WebhookEvent).to receive(:trigger).with('tasks.created', any_args)
      AdvisableSchema.execute(query, context: context)
    end
  end

  context 'when the specialist is authenticated' do
    let(:context) { { current_user: specialist } }

    it 'responds with not_authorized error code' do
      expect(response['data']['createTask']['task']).to_not be_nil
    end
  end

  context 'when there is no user signed in' do
    let(:context) { { current_user: nil } }

    it 'responds with not_authorized error code' do
      error = response['data']['createTask']['errors'][0]
      expect(error['code']).to eq('not_authorized')
    end
  end

  context 'when a user is logged in but they dont have access to the project' do
    let(:context) { { current_user: create(:user) } }

    it 'responds with not_authorized error code' do
      error = response['data']['createTask']['errors'][0]
      expect(error['code']).to eq('not_authorized')
    end
  end

  context 'when a specialist is logged in but they dont have access to the project' do
    let(:context) { { current_user: create(:specialist) } }

    it 'responds with not_authorized error code' do
      error = response['data']['createTask']['errors'][0]
      expect(error['code']).to eq('not_authorized')
    end
  end

  context 'when a Service::Error is thrown' do
    before :each do
      error = Service::Error.new('service_error')
      allow(Tasks::Create).to receive(:call).and_raise(error)
    end

    it 'returns an error' do
      error = response['data']['createTask']['errors'][0]
      expect(error['code']).to eq('service_error')
    end
  end
end
