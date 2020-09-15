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
        application: "#{application.airtable_id}",
        projectType: "#{project_type}",
        monthlyLimit: #{monthly_limit}
      }) {
        application {
          id
        }
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  let(:context) { { current_user: application.project.user } }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the project_type to 'Flexible'" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      application.reload.project_type
    }.from('Flexible')
      .to('Fixed')
  end

  it 'sets the monthly_limit' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      application.reload.monthly_limit
    }.from(nil)
      .to(400)
  end

  context 'when an invalid project type is passed' do
    let(:project_type) { 'invalidType' }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['setTypeForProject']['errors'][0]['code']
      expect(error).to eq('invalidProjectType')
    end
  end

  context "When setting the project type to 'Flexible'" do
    let(:application) do
      create(:application, project_type: 'Fixed', monthly_limit: monthly_limit)
    end
    let(:project_type) { 'Flexible' }

    it 'calls the flexible invoice service' do
      expect(Applications::FlexibleInvoice).to receive(:call)
      AdvisableSchema.execute(query, context: context)
    end
  end

  context 'When only updating the monthly limit' do
    let(:application) do
      create(:application, project_type: 'Flexible', monthly_limit: 100)
    end
    let(:project_type) { 'Flexible' }
    let(:monthly_limit) { 400 }

    it 'calls the flexible invoice service' do
      expect(Applications::FlexibleInvoice).to receive(:call)
      AdvisableSchema.execute(query, context: context)
    end
  end

  context 'When the user is not the owner of the project' do
    let(:context) { { current_user: create(:user) } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['setTypeForProject']['errors'][0]['code']
      expect(error).to eq('not_authorized')
    end
  end
end
