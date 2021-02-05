# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::ConfirmProject do
  let(:project) { create(:project, status: 'Brief Pending Confirmation') }

  let(:query) do
    <<-GRAPHQL
    mutation {
      confirmProject(input: {
        id: "#{project.uid}",
      }) {
        project {
          status
        }
      }
    }
    GRAPHQL
  end

  before do
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it "sets the status to 'Brief Confirmed'" do
    response = AdvisableSchema.execute(query)
    status = response['data']['confirmProject']['project']['status']
    expect(status).to eq('Brief Confirmed')
  end

  context "when the status is not 'Biref Pending confirmation'" do
    let(:project) { create(:project, status: 'Draft') }

    it 'returns an error' do
      response = AdvisableSchema.execute(query)
      error = response['errors'][0]
      expect(error['message']).to eq('project.not_pending_approval')
    end
  end

  context 'when there is still a deposit to be paid' do
    let(:project) do
      create(:project, status: 'Brief Pending Confirmation', deposit: 100_00)
    end

    it 'returns an error' do
      response = AdvisableSchema.execute(query)
      error = response['errors'][0]
      expect(error['message']).to eq('project.deposit_not_paid')
    end
  end
end
