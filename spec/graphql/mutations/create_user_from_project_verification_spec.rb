require 'rails_helper'

RSpec.describe Mutations::CreateUserFromProjectVerification do
  let(:oauth_viewer) do
    OauthViewer.new(
      {
        'uid' => 'test',
        'provider' => 'linkedin',
        'name' => 'John Doe',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'image' => 'image_url'
      }
    )
  end

  let(:project) { create(:previous_project) }
  let(:email) { 'test@test.com' }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createUserFromProjectVerification(input: {
        email: "#{email}",
        previousProject: "#{project.uid}",
        fid: "fid1234",
      }) {
        user {
          id
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'creates a new user' do
    expect {
      AdvisableSchema.execute(query, context: {oauth_viewer: oauth_viewer})
    }.to change { User.count }.by(1)
  end

  context 'when not logged in with oauth' do
    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: {oauth_viewer: nil})
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('notAuthenticated')
    end
  end

  context 'when provided a blacklisted email' do
    let(:email) { 'test@gmail.com' }

    it 'returns an error' do
      create(:blacklisted_domain, domain: 'gmail.com')
      response =
        AdvisableSchema.execute(query, context: {oauth_viewer: oauth_viewer})
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('nonCorporateEmail')
    end
  end

  context 'when provided an email that is already taken' do
    it 'returns an error' do
      create(:user, email: email)
      response =
        AdvisableSchema.execute(query, context: {oauth_viewer: oauth_viewer})
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('emailTaken')
    end
  end
end
