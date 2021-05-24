# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::StopWorking do
  let(:application) { create(:application, status: 'Working') }
  let(:context) { {current_user: application.project.user} }
  let(:query) do
    <<-GRAPHQL
    mutation {
      stopWorking(input: {
        application: "#{application.uid}",
        reason: "Because"
      }) {
        application {
          id
          status
        }
      }
    }
    GRAPHQL
  end

  before { allow_any_instance_of(Application).to receive(:sync_to_airtable) }

  context "when logged in as the client" do
    it "sets the status and reason" do
      expect(application.reload.status).to eq("Working")
      AdvisableSchema.execute(query, context: context)
      expect(application.reload.status).to eq("Stopped Working")
      expect(application.stopped_working_reason).to eq("Because")
    end
  end

  context "when logged in as the specialist" do
    let(:context) { {current_user: application.specialist} }

    it "sets the status and reason" do
      expect(application.reload.status).to eq("Working")
      AdvisableSchema.execute(query, context: context)
      expect(application.reload.status).to eq("Stopped Working")
      expect(application.stopped_working_reason).to eq("Because")
    end
  end

  context 'when logged in as a random client' do
    let(:context) { {current_user: create(:user)} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context 'when logged in as a random specialist' do
    let(:context) { {current_user: create(:specialist)} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context "when the application status is not 'Working'" do
    let(:application) { create(:application, status: 'Applied') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('APPLICATION_STATUS_NOT_WORKING')
    end
  end
end
