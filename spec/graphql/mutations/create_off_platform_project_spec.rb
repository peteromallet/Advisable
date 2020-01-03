require 'rails_helper'

describe Mutations::CreateOffPlatformProject do
  let!(:design) { create(:skill, name: 'Design') }
  let!(:marketing) { create(:skill, name: 'Marketing') }

  let!(:advertising) { create(:industry, name: 'Advertising') }
  let!(:computing) { create(:industry, name: 'Computing') }

  let(:specialist) { create(:specialist) }
  let(:client_name) { 'Dunder Mifflen' }
  let(:confidential) { false }
  let(:industries) { [advertising.name, computing.name] }
  let(:primary_industry) { advertising.name }
  let(:client_description) { 'Client Description' }
  let(:goal) { 'Goal' }
  let(:skills) { [design.name, marketing.name] }
  let(:primary_skill) { design.name }
  let(:requirements) { 'Requirements' }
  let(:results) { 'results' }
  let(:contact_name) { 'Jane Doe' }
  let(:company_type) { 'Startup' }
  let(:contact_job_title) { 'CEO' }
  let(:can_contact) { true }
  let(:description) { 'description' }
  let(:public_use) { true }
  let(:contact_relationship) { 'They managed the project' }

  let(:query) do
    <<~GRAPHQL
    mutation {
      createOffPlatformProject(input: {
        specialist: \"#{specialist.airtable_id}\",
        clientName: \"#{client_name}\",
        confidential: #{confidential},
        industries: #{industries},
        primaryIndustry: #{primary_industry}
        skills: #{skills},
        primarySkill: #{primary_skill},
        companyType: \"#{company_type}\",
        publicUse: #{public_use},
        contactName: \"#{contact_name}\",
        contactJobTitle: \"#{contact_job_title}\",
        description: \"#{description}\",
        contactRelationship: \"#{contact_relationship}\",
        goal: \"#{goal}\"
      }) {
        previousProject {
          project {
            ... on OffPlatformProject {
              clientName
              industry
              description
              clientDescription
              skills
              results
              contactFirstName
              contactLastName
              contactJobTitle
            }
          }
        }
        errors {
          code
        }
      }
    }  
  GRAPHQL
  end

  before :each do
    allow_any_instance_of(OffPlatformProject).to receive(:sync_to_airtable)
  end

  it 'creates a new off platform project' do
    expect { response = AdvisableSchema.execute(query) }.to change {
      specialist.off_platform_projects.count
    }.by(1)
  end

  describe 'response' do
    let(:response) { AdvisableSchema.execute(query) }
    let(:project) do
      response['data']['createOffPlatformProject']['previousProject']['project']
    end

    it 'includes the clientName' do
      expect(project['clientName']).to eq(client_name)
    end

    context 'when confidential is true' do
      let(:confidential) { true }

      it 'masks the clientName' do
        expect(project['clientName']).to eq("#{advertising.name} Company")
      end
    end

    it 'sets the industry' do
      expect(project['industry']).to eq(advertising.name)
    end

    it 'sets the description' do
      expect(project['description']).to eq(description)
    end

    it 'sets the skills' do
      expect(project['skills']).to include(skills[0])
      expect(project['skills']).to include(skills[1])
    end

    it 'sets the contactFirstName' do
      expect(project['contactFirstName']).to eq('Jane')
    end

    it 'sets the contactLastName' do
      expect(project['contactLastName']).to eq('Doe')
    end

    it 'sets the contactJobTitle' do
      expect(project['contactJobTitle']).to eq('CEO')
    end
  end
end
