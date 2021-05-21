# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateConsultation do
  let!(:specialist) { create(:specialist) }
  let(:skill) { create(:skill) }
  let(:first_name) { 'John' }
  let(:last_name) { 'Doe' }
  let(:email) { 'test@test.com' }
  let(:company_name) { 'Testing' }
  let(:skill_name) { skill.name }
  let(:session_manager) { SessionManager.new(session: OpenStruct.new, cookies: OpenStruct.new) }
  let(:context) { {session_manager: session_manager} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createConsultation(input: {
        specialist: "#{specialist.uid}",
        firstName: "#{first_name}",
        lastName: "#{last_name}",
        email: "#{email}",
        company: "#{company_name}",
        skill: "#{skill_name}",
      }) {
        consultation {
          id
        }
      }
    }
    GRAPHQL
  end

  before do
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'creates a new consultation record' do
    expect { AdvisableSchema.execute(query, context: context) }.to change(Consultation, :count).by(1)
  end

  context 'when a consultation record already exists' do
    let!(:user) { create(:user, account: create(:account, email: email)) }

    before { create(:consultation, user: user, status: 'Request Started', specialist: specialist) }

    it 'does not create a new consultation record' do
      expect { AdvisableSchema.execute(query, context: context) }.not_to change(Consultation, :count)
    end
  end

  context 'when there is no existing user with the email' do
    it 'creates a new user account' do
      expect { AdvisableSchema.execute(query, context: context) }.to change(User, :count).by(1)
    end

    it "gives user's account team manager permission" do
      response = AdvisableSchema.execute(query, context: context)
      consultation = Consultation.find_by(uid: response["data"]["createConsultation"]["consultation"]["id"])
      expect(consultation.user.account.permissions).to include('team_manager')
    end
  end

  context 'when a freelancers email is provided' do
    before { create(:specialist, account: create(:account, email: email)) }

    it 'raises an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('EMAIL_BELONGS_TO_A_FREELANCER')
    end
  end

  context 'when the skill does not exist' do
    let(:skill_name) { 'Doesnt Exist' }

    it 'raises an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('NOT_FOUND')
    end
  end
end
