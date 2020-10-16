require 'rails_helper'

RSpec.describe Mutations::Login do
  let(:account) { create(:account, password: 'testing123') }
  let(:user) { create(:user, account: account) }
  let(:email) { user.email }
  let(:password) { 'testing123' }
  let(:session_manager) do
    SessionManager.new(session: OpenStruct.new, cookies: OpenStruct.new)
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      login(input: {
        email: "#{email}",
        password: "#{password}"
      }) {
        viewer {
          ... on User {
            id
            email
          }
          ... on Specialist {
            id
            email
          }
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow(session_manager).to receive(:login)
  end

  def response
    AdvisableSchema.execute(
      query,
      context: {
        current_user: nil,
        session_manager: session_manager,
      }
    )
  end

  it 'returns a viewer' do
    viewer = response['data']['login']['viewer']
    expect(viewer['id']).to eq(user.uid)
    expect(viewer['email']).to eq(user.email)
  end

  context 'when the user is a specialist' do
    let(:user) { create(:specialist, account: create(:account, password: 'testing123')) }

    it 'returns a specialist' do
      viewer = response['data']['login']['viewer']
      expect(viewer['id']).to eq(user.uid)
      expect(viewer['email']).to eq(user.email)
    end
  end

  context 'when the email is incorrect' do
    let(:email) { 'wrong@advisable.com' }

    it 'returns an error' do
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('AUTHENTICATION_FAILED')
    end

    it 'doesnt login the user' do
      expect(session_manager).to_not receive(:login)
      response
    end
  end

  context 'when the password is incorrect' do
    let(:password) { 'wrongpassword123' }

    it 'returns an error' do
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('AUTHENTICATION_FAILED')
    end

    it 'doesnt login the user' do
      expect(session_manager).to_not receive(:login)
      response
    end
  end
end
