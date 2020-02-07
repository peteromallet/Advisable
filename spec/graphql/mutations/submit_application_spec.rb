require 'rails_helper'

describe Mutations::SubmitApplication do
  let(:application) do
    create(:application, applied_at: nil, status: 'Invited To Apply')
  end
  let(:query) do
    <<-GRAPHQL
    mutation {
      submitApplication(input: {
        id: "#{application.airtable_id}",
      }) {
        application {
          id
          status
        }
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  let(:context) { { current_user: application.specialist } }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the status to 'Proposed'" do
    response = AdvisableSchema.execute(query, context: context)
    status = response['data']['submitApplication']['application']['status']
    expect(status).to eq('Applied')
  end

  it 'sets the applied at attribute' do
    expect(application.reload.applied_at).to be_nil
    AdvisableSchema.execute(query, context: context)
    expect(application.reload.applied_at).to_not be_nil
  end

  context 'when applications are closed' do
    let(:project) { create(:project, sales_status: 'Lost') }
    let(:application) do
      create(
        :application,
        project: project, applied_at: nil, status: 'Invited To Apply'
      )
    end

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['submitApplication']['errors'][0]['code']
      expect(error).to eq('projects.applicationsClosed')
    end
  end

  context 'when the status is Applied' do
    let(:application) do
      create(:application, applied_at: nil, status: 'Applied')
    end

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['submitApplication']['errors'][0]['code']
      expect(error).to eq('applications.cannotSubmit')
    end
  end
end
