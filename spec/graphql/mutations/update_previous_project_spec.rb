require 'rails_helper'

describe Mutations::UpdatePreviousProject do
  let(:project) do
    create(
      :previous_project,
      client_name: 'Test',
      confidential: false,
      primary_skill: nil,
      primary_industry: nil,
      company_type: 'Corporation',
      description: 'Description',
      goal: nil,
      public_use: true
    )
  end
  let(:client_name) { 'CHANGED' }
  let!(:marketing) { create(:skill, name: 'Marketing') }
  let!(:design) { create(:skill, name: 'Design') }
  let(:skills) { [marketing.name, design.name] }
  let(:confidential) { true }
  let(:primary_skill) { marketing.name }
  let(:company_type) { 'Startup' }
  let(:industry1) { create(:industry, name: 'Industry 1') }
  let(:industry2) { create(:industry, name: 'Industry 2') }
  let(:industries) { [industry1.name, industry2.name] }
  let(:primary_industry) { industry1.name }
  let(:description) { 'Testing' }
  let(:goal) { 'Goal' }
  let(:public_use) { false }

  let(:query) do
    <<~GRAPHQL
    mutation {
      updatePreviousProject(input: {
        previousProject: "#{project.uid}",
        skills: #{skills},
        clientName: "#{client_name}",
        companyType: "#{company_type}",
        primarySkill: "#{primary_skill}",
        description: "#{description}",
        industries: #{industries},
        confidential: #{confidential},
        primaryIndustry: "#{primary_industry}"
        goal: "#{goal}",
        publicUse: #{public_use},
      }) {
        previousProject {
          id
        }
      }
    }  
  GRAPHQL
  end

  it 'sets the skills for the project' do
    other = create(:skill)
    project.skills << other
    response = AdvisableSchema.execute(query)
    expect(project.reload.skills).to include(marketing)
    expect(project.reload.skills).to include(design)
    expect(project.reload.skills).to_not include(other)
  end

  it 'sets the primary skill' do
    other = create(:skill)
    project.project_skills.create(skill: other, primary: true)
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.primary_skill
    }.from(other).to(marketing)
  end

  it 'sets the industries for the project' do
    other = create(:industry)
    project.industries << other
    response = AdvisableSchema.execute(query)
    expect(project.reload.industries).to include(industry1)
    expect(project.reload.industries).to include(industry2)
    expect(project.reload.industries).to_not include(other)
  end

  it 'sets the primary industry' do
    other = create(:industry)
    project.project_industries.create(industry: other, primary: true)
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.primary_industry
    }.from(other).to(industry1)
  end

  it 'sets the client name' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.client_name
    }.from('Test').to(client_name)
  end

  it 'sets the confidential attribute' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.confidential
    }.from(false).to(true)
  end

  it 'sets the company_type' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.company_type
    }.from('Corporation').to('Startup')
  end

  it 'sets the description' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.description
    }.from('Description').to('Testing')
  end

  it 'sets the goal' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.goal
    }.from(nil).to('Goal')
  end

  it 'sets public_use' do
    expect { AdvisableSchema.execute(query) }.to change {
      project.reload.public_use
    }.from(true).to(false)
  end
end
