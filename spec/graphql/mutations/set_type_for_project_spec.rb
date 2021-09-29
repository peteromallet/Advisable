# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::SetTypeForProject do
  let(:application) do
    create(:application, project_type: 'Flexible', monthly_limit: nil)
  end
  let(:project_type) { 'Fixed' }
  let(:monthly_limit) { 400 }

  let(:query) do
    <<-GRAPHQL
    mutation {
      setTypeForProject(input: {
        application: "#{application.uid}",
        projectType: "#{project_type}",
        monthlyLimit: #{monthly_limit}
      }) {
        application {
          id
        }
      }
    }
    GRAPHQL
  end

  let(:context) { {current_user: application.project.user} }

  before do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the project_type to 'Flexible'" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      application.reload.project_type
    }.from('Flexible').
      to('Fixed')
  end

  it 'sets the monthly_limit' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      application.reload.monthly_limit
    }.from(nil).
      to(400)
  end

  context 'when an invalid project type is passed' do
    let(:project_type) { 'invalidType' }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('INVALID_PROJECT_TYPE')
    end
  end

  context 'when the user is not the owner of the project' do
    let(:context) { {current_user: create(:user)} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('notAuthorized')
    end
  end
end
