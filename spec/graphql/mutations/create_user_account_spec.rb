require 'rails_helper'

RSpec.describe Mutations::CreateUserAccount do
  let(:skill) { create(:skill) }
  let(:skill_name) { skill.name }
  let(:industry) { create(:industry) }
  let(:industry_name) { industry.name }
  let(:industry_experience_required) { true }
  let(:company_type) { 'Startup' }
  let(:company_type_experience_required) { true }
  let(:email) { 'test@test.com' }
  let(:specialists) { [] }
  let(:campaign_name) { 'Test' }
  let(:campaign_source) { 'Test' }
  let(:pid) { nil }
  let(:rid) { nil }
  let(:gclid) { nil }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createUserAccount(input: {
        skill: "#{skill_name}",
        industry: "#{industry_name}",
        industryExperienceRequired: #{industry_experience_required},
        companyType: "#{company_type}",
        companyTypeExperienceRequired: #{company_type_experience_required},
        email: "#{email}",
        specialists: #{specialists},
        campaignName: "#{campaign_name}",
        campaignSource: "#{campaign_source}",
        pid: "#{pid}",
        rid: "#{rid}",
        gclid: "#{gclid}",
      }) {
        project {
          id
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(Client).to receive(:sync_to_airtable)
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it 'creates a new user' do
    expect { AdvisableSchema.execute(query) }.to change { User.count }.by(1)
  end

  it 'creates a new client' do
    expect { AdvisableSchema.execute(query) }.to change { Client.count }.by(1)
  end

  it 'creates a new project' do
    expect { AdvisableSchema.execute(query) }.to change { Project.count }.by(1)
  end

  context 'when a specialist is provided' do
    let(:specialist) { create(:specialist) }
    let(:specialists) { [specialist.airtable_id] }

    it 'creates an application record for that specialist' do
      expect { AdvisableSchema.execute(query) }.to change {
        Application.count
      }.by(1)
    end
  end

  context 'when provides more than 10 specialists' do
    let(:specialists) { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }

    it 'raises an error' do
      response = AdvisableSchema.execute(query)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('tooManySpecialists')
    end
  end

  context 'when the email has been blacklisted' do
    it 'raises an error' do
      create(:blacklisted_domain, domain: 'test.com')
      response = AdvisableSchema.execute(query)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('nonCorporateEmail')
    end
  end

  context 'when the email has already been taken' do
    it 'raises an error' do
      create(:user, account: create(:account, email: email))
      response = AdvisableSchema.execute(query)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('emailTaken')
    end
  end
end
