require 'rails_helper'

RSpec.describe Mutations::CreatePreviousProject do
  let(:specialist) { create(:specialist) }

  let!(:advertising) { create(:industry, name: 'Advertising') }
  let!(:computing) { create(:industry, name: 'Computing') }
  let(:industries) { [advertising.name, computing.name] }
  let(:primary_industry) { advertising.name }

  let(:client_name) { 'Dunder Mifflen' }
  let(:confidential) { false }
  let(:company_type) { 'Startup' }

  let(:query) do
    <<~GRAPHQL
    mutation {
      createPreviousProject(input: {
        specialist: "#{specialist.airtable_id}",
        clientName: "#{client_name}",
        confidential: #{confidential},
        industries: #{industries},
        primaryIndustry: "#{primary_industry}"
        companyType: "#{company_type}",
      }) {
        previousProject {
          id
          clientName
        }
      }
    }  
  GRAPHQL
  end

  before :each do
    allow_any_instance_of(PreviousProject).to receive(:sync_to_airtable)
  end

  it 'creates a new previous project for the specialist' do
    expect { AdvisableSchema.execute(query) }.to change {
      specialist.previous_projects.count
    }.by(1)
  end

  it 'sets the client name' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.client_name).to eq(client_name)
  end

  context 'when confidential is true' do
    let(:confidential) { true }

    it 'marks the project as confidential' do
      response = AdvisableSchema.execute(query)
      project = PreviousProject.last
      expect(project.confidential).to be_truthy
    end
  end

  it 'creates industry records for the project' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.industries).to include(advertising)
    expect(project.industries).to include(computing)
  end

  it 'sets the primary industry' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.primary_industry).to eq(advertising)
  end

  it 'sets the company type' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.company_type).to eq(company_type)
  end
end
