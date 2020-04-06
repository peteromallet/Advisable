require 'rails_helper'

describe Mutations::CreatePreviousProject do
  let(:specialist) { create(:specialist) }

  let!(:advertising) { create(:industry, name: 'Advertising') }
  let!(:computing) { create(:industry, name: 'Computing') }
  let(:industries) { [advertising.name, computing.name] }
  let(:primary_industry) { advertising.name }

  let!(:design) { create(:skill, name: 'Design') }
  let!(:marketing) { create(:skill, name: 'Marketing') }
  let(:skills) { [design.name, marketing.name] }
  let(:primary_skill) { design.name }

  let(:client_name) { 'Dunder Mifflen' }
  let(:confidential) { false }
  let(:goal) { 'Goal' }
  let(:contact_name) { 'Jane Doe' }
  let(:company_type) { 'Startup' }
  let(:contact_job_title) { 'CEO' }
  let(:description) { 'description' }
  let(:public_use) { true }
  let(:contact_relationship) { 'They managed the project' }

  let(:query) do
    <<~GRAPHQL
    mutation {
      createPreviousProject(input: {
        specialist: "#{specialist.airtable_id}",
        clientName: "#{client_name}",
        confidential: #{confidential},
        industries: #{industries},
        primaryIndustry: "#{primary_industry}"
        skills: #{skills},
        primarySkill: "#{primary_skill}",
        companyType: "#{company_type}",
        publicUse: #{public_use},
        contactName: "#{contact_name}",
        contactJobTitle: "#{contact_job_title}",
        description: "#{description}",
        contactRelationship: "#{contact_relationship}",
        goal: "#{goal}"
      }) {
        previousProject {
          id
          companyName
        }
      }
    }  
  GRAPHQL
  end

  before :each do
    allow_any_instance_of(PreviousProject).to receive(:sync_to_airtable)
  end

  it 'creates a new previous project for the specialist' do
    expect { response = AdvisableSchema.execute(query) }.to change {
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

  it 'creates skill records for the project' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.skills).to include(design)
    expect(project.skills).to include(marketing)
  end

  it 'sets the skill industry' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.primary_skill).to eq(design)
  end

  it 'sets the company type' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.company_type).to eq(company_type)
  end

  context 'when publicUse is false' do
    let(:public_use) { false }

    it 'sets public_use to false' do
      response = AdvisableSchema.execute(query)
      project = PreviousProject.last
      expect(project.public_use).to be_falsey
    end
  end

  it 'sets the contact_first_name' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.contact_first_name).to eq('Jane')
  end

  it 'sets the contact_last_name' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.contact_last_name).to eq('Doe')
  end

  it 'sets the contact job title' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.contact_job_title).to eq(contact_job_title)
  end

  it 'sets the description' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.description).to eq(description)
  end

  it 'sets the goal' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.goal).to eq(goal)
  end

  it 'sets the contact relationship' do
    response = AdvisableSchema.execute(query)
    project = PreviousProject.last
    expect(project.contact_relationship).to eq(contact_relationship)
  end
end
