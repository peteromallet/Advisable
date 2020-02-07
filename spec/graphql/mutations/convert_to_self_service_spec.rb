require 'rails_helper'

describe Mutations::ConvertToSelfService do
  let(:project) do
    create(:project, status: 'Project Created', service_type: 'Assisted')
  end
  let(:query) do
    <<-GRAPHQL
    mutation {
      convertToSelfService(input: {
        id: "#{project.airtable_id}"
      }) {
        project {
          id
          status
          serviceType
        }
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it 'sets the service_type to Self-Service' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.service_type
    }.from('Assisted')
      .to('Self-Service')
  end

  it 'sets the status to Brief Pending Confirmation' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.status
    }.from('Project Created')
      .to('Brief Pending Confirmation')
  end

  context 'when the status is not Project Created' do
    let(:project) do
      create(
        :project,
        service_type: 'Assisted', status: 'Brief Pending Confirmation'
      )
    end

    it 'returns an error' do
      response = AdvisableSchema.execute(query)
      errors = response['data']['convertToSelfService']['errors']
      expect(errors[0]['code']).to eq('projects.statusNotCreated')
    end
  end

  context 'when the service_type is not Assisted' do
    let(:project) do
      create(:project, service_type: 'Self-Service', status: 'Project Created')
    end

    it 'returns an error' do
      response = AdvisableSchema.execute(query)
      errors = response['data']['convertToSelfService']['errors']
      expect(errors[0]['code']).to eq('projects.alreadySelfService')
    end
  end
end
