require 'rails_helper'

RSpec.describe Mutations::CreateFreelancerAccount do
  let(:project) { create(:project) }
  let(:skill) { create(:skill, name: 'Marketing') }
  let(:skill_name) { skill.name }
  let(:email) { 'test@test.com' }
  let(:session_manager) do
    SessionManager.new(session: OpenStruct.new, cookies: OpenStruct.new)
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      createFreelancerAccount(input: {
        firstName: "Test",
        lastName: "Account",
        email: "#{email}",
        phone: "0861234567",
        password: "testing123",
        skills: ["#{skill_name}"],
        pid: "#{project.try(:airtable_id)}",
        campaignName: "campaignName",
        campaignSource: "campaignSource",
        referrer: "referrer"
      }) {
        viewer {
          ... on Specialist {
            id
          }
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow(session_manager).to receive(:login)
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    project = double(Airtable::Project)
    allow(project).to receive(:sync)
    allow(Airtable::Project).to receive(:find).and_return(project)
  end

  def response
    AdvisableSchema.execute(
      query,
      context: {session_manager: session_manager}
    )
  end

  it 'Creates a new specialist' do
    expect { response }.to change { Specialist.count }.by(1)
  end

  it 'Adds the provided skills' do
    response
    specialist = Specialist.order(:created_at).last
    expect(specialist.skills).to include(skill)
  end

  it 'Creates an application invitation if a PID is provided' do
    response
    specialist = Specialist.order(:created_at).last
    expect(specialist.applications.first.project).to eq(project)
  end

  it 'sends the confirmation email' do
    expect_any_instance_of(Specialist).to receive(:send_confirmation_email)
    response
  end

  context 'when no pid is provided' do
    let(:project) { nil }

    it "doesn't create any application record" do
      response
      specialist = Specialist.order(:created_at).last
      expect(specialist.applications).to be_empty
    end
  end

  context "When given a skill that doesn't exist" do
    let(:skill_name) { 'Nope' }

    it 'returns an error' do
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('skillNotFound')
    end
  end

  context 'When given an email that is already been used' do
    let(:user) { create(:user) }
    let(:email) { user.account.email.upcase }

    it 'returns an error' do
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('emailTaken')
    end
  end

  it 'sets the first_name' do
    response
    specialist = Specialist.last
    expect(specialist.first_name).to eq('Test')
  end

  it 'sets the last_name' do
    response
    specialist = Specialist.last
    expect(specialist.last_name).to eq('Account')
  end

  it 'sets the email' do
    response
    specialist = Specialist.last
    expect(specialist.account.email).to eq(email)
  end

  it 'sets the phone_number' do
    response
    specialist = Specialist.last
    expect(specialist.phone).to eq('0861234567')
  end
end
