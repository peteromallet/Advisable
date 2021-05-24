# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdatePreviousProject do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:context) { {current_user: current_user} }

  let(:draft) { true }
  let(:validation_status) { 'Pending' }
  let(:project) { create(:previous_project, specialist: specialist, client_name: 'Test', confidential: false, primary_skill: nil, primary_industry: nil, company_type: 'Corporation', description: 'Description', goal: nil, draft: draft, public_use: true, validation_status: validation_status) }

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
    AdvisableSchema.execute(query, context: context)
    expect(project.reload.skills).to include(marketing)
    expect(project.reload.skills).to include(design)
    expect(project.reload.skills).not_to include(other)
  end

  context 'when project is not a draft' do
    let(:draft) { false }

    it 'returns an error when trying to update skills when project is not a draft' do
      query = <<~GRAPHQL
        mutation {
          updatePreviousProject(input: {
            previousProject: "#{project.uid}",
            skills: ["Marketing", "Design"]
          }) {
            previousProject {
              id
            }
          }
        }
      GRAPHQL

      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('PROJECT_PUBLISHED')
    end
  end

  it 'sets the primary skill' do
    other = create(:skill)
    project.project_skills.create(skill: other, primary: true)
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.primary_skill
    }.from(other).to(marketing)
  end

  it 'sets the industries for the project' do
    other = create(:industry)
    project.industries << other
    AdvisableSchema.execute(query, context: context)
    expect(project.reload.industries).to include(industry1)
    expect(project.reload.industries).to include(industry2)
    expect(project.reload.industries).not_to include(other)
  end

  it 'sets the primary industry' do
    other = create(:industry)
    project.project_industries.create(industry: other, primary: true)
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.primary_industry
    }.from(other).to(industry1)
  end

  it 'sets the client name' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.client_name
    }.from('Test').to(client_name)
  end

  it 'sets the confidential attribute' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.confidential
    }.from(false).to(true)
  end

  it 'sets the company_type' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.company_type
    }.from('Corporation').to('Startup')
  end

  it 'sets the description' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.description
    }.from('Description').to('Testing')
  end

  it 'sets the goal' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.goal
    }.from(nil).to('Goal')
  end

  it 'sets public_use' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.public_use
    }.from(true).to(false)
  end

  describe "updating contact details" do
    let(:validation_status) { "Pending" }
    let(:project) do
      create(:previous_project, {
        specialist: specialist,
        validation_status: validation_status.to_s,
        draft: false,
        contact_name: "Jane Doe",
        contact_job_title: "Janitor",
        contact_relationship: "Good friend"
      })
    end
    let(:query) do
      <<~GRAPHQL
        mutation {
          updatePreviousProject(input: {
            previousProject: "#{project.uid}",
            contactName: "John Doe",
            contactJobTitle: "CEO",
            contactRelationship: "They managed the project"
          }) {
            previousProject {
              id
            }
          }
        }
      GRAPHQL
    end

    it "updates contact details" do
      expect(project.contact_name).to eq("Jane Doe")
      expect(project.contact_job_title).to eq("Janitor")
      expect(project.contact_relationship).to eq("Good friend")
      AdvisableSchema.execute(query, context: context)
      project.reload
      expect(project.contact_name).to eq("John Doe")
      expect(project.contact_job_title).to eq("CEO")
      expect(project.contact_relationship).to eq("They managed the project")
    end

    context "when the project has been validated" do
      let(:validation_status) { "Validated" }

      it "returns an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"][0]["extensions"]["code"]
        expect(error).to eq("PROJECT_VALIDATED")
        expect(project.contact_name).not_to eq("John Doe")
      end
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq("notAuthenticated")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq("MUST_BE_SPECIALIST")
    end
  end
end
