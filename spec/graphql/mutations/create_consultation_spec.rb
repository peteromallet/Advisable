require 'rails_helper'

RSpec.describe Mutations::CreateConsultation do
  let!(:specialist) { create(:specialist) }
  let(:skill) { create(:skill) }
  let(:first_name) { 'John' }
  let(:last_name) { 'Doe' }
  let(:email) { 'test@test.com' }
  let(:company) { 'Testing' }
  let(:skill_name) { skill.name }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createConsultation(input: {
        specialist: "#{specialist.uid}",
        firstName: "#{first_name}",
        lastName: "#{last_name}",
        email: "#{email}",
        company: "#{company}",
        skill: "#{skill_name}",
      }) {
        consultation {
          id
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(Client).to receive(:sync_to_airtable)
  end

  it 'creates a new consultation record' do
    expect { AdvisableSchema.execute(query) }.to change {
      Consultation.count
    }.by(1)
  end

  context 'when a consultation record already exists' do
    let!(:consultation) do
      create(
        :consultation,
        user: user, status: 'Request Started', specialist: specialist
      )
    end
    let!(:user) { create(:user, email: email) }

    it 'does not create a new consultation record' do
      expect { AdvisableSchema.execute(query) }.not_to change {
        Consultation.count
      }
    end
  end

  context 'when the user account already exists' do
    let!(:user) { create(:user, email: email, company_name: 'Existing') }

    it 'doesnt create a new user record' do
      expect { AdvisableSchema.execute(query) }.not_to change { User.count }
    end

    it 'updates their company name' do
      expect { AdvisableSchema.execute(query) }.to change {
        user.reload.company_name
      }.from('Existing')
        .to(company)
    end

    it 'updates their associated client name' do
      client = create(:client, name: 'Existing')
      client.users << user
      expect { AdvisableSchema.execute(query) }.to change {
        user.reload.client.name
      }.from('Existing')
        .to(company)
    end

    it 'creates a client for the user if they dont have one' do
      user.client_user.try(:destroy)
      expect(user.reload.client).to be_nil
      AdvisableSchema.execute(query)
      expect(user.reload.client).to_not be_nil
    end
  end

  context 'when there is no existing user with the email' do
    it 'creates a new user account' do
      expect { AdvisableSchema.execute(query) }.to change { User.count }.by(1)
    end
  end

  context 'when a freelancers email is provided' do
    let!(:specialist) { create(:specialist, email: email) }

    it 'raises an error' do
      response = AdvisableSchema.execute(query)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('emailBelongsToFreelancer')
    end
  end

  context 'when the skill does not exist' do
    let(:skill_name) { 'Doesnt Exist' }

    it 'raises an error' do
      response = AdvisableSchema.execute(query)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('notFound')
    end
  end
end
