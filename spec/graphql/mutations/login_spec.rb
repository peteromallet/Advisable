require 'rails_helper'

describe Mutations::Login do
  let(:user) { create(:user, password: 'testing123') }
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
          }
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
  end

  def response
    AdvisableSchema.execute(
      query,
      context: { session_manager: session_manager }
    )
  end

  it 'returns a viewer' do
    id = response['data']['login']['viewer']['id']
    expect(id).to eq(user.uid)
  end

  context 'when the user is a specialist' do
    let(:user) { create(:specialist, password: 'testing123') }

    it 'returns a specialist' do
      id = response['data']['login']['viewer']['id']
      expect(id).to eq(user.uid)
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
