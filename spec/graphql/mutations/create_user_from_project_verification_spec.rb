# frozen_string_literal: true

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

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'creates a new user' do
    expect do
      AdvisableSchema.execute(query, context: {oauth_viewer: oauth_viewer})
    end.to change(User, :count).by(1)
  end

  it "gives newly created user's account team manager permission" do
    response = AdvisableSchema.execute(query, context: {oauth_viewer: oauth_viewer})
    user = User.find_by(uid: response["data"]["createUserFromProjectVerification"]["user"]["id"])
    expect(user.account.permissions).to include('team_manager')
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
      create(:user, account: create(:account, email: email))
      response = AdvisableSchema.execute(query, context: {oauth_viewer: oauth_viewer})
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('EMAIL_TAKEN')
    end
  end

  context "when no email" do
    let(:email) { "" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: {oauth_viewer: oauth_viewer})
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("EMAIL_BLANK")
    end
  end
end
