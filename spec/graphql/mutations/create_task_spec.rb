# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateTask do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:project) { create(:project, user: user) }
  let(:application) do
    create(:application, specialist: specialist, project: project)
  end
  let(:context) { {current_user: user} }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createTask(input: {
        id: "#{Task.generate_uid}",
        application: "#{application.uid}",
      }) {
        task {
          id
        }
      }
    }
    GRAPHQL
  end

  before do
    allow_any_instance_of(Airtable::Task).to receive(:create)
  end

  context 'when a user is signed in' do
    it 'creates a new task' do
      expect(response['data']['createTask']['task']).not_to be_nil
    end
  end

  context 'when the specialist is authenticated' do
    let(:context) { {current_user: specialist} }

    it 'responds with not_authorized error code' do
      expect(response['data']['createTask']['task']).not_to be_nil
    end
  end

  context 'when there is no user signed in' do
    let(:context) { {current_user: nil} }

    it 'responds with not_authorized error code' do
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('notAuthorized')
    end
  end

  context 'when a user is logged in but they dont have access to the project' do
    let(:context) { {current_user: create(:user)} }

    it 'responds with not_authorized error code' do
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('notAuthorized')
    end
  end

  context 'when a specialist is logged in but they dont have access to the project' do
    let(:context) { {current_user: create(:specialist)} }

    it 'responds with not_authorized error code' do
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('notAuthorized')
    end
  end
end
