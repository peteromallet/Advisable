require 'rails_helper'

RSpec.describe Mutations::ConfirmAccount do
  let(:token) { Token.new }
  let(:input_token) { token }
  let(:digest) { Token.digest(token) }
  let(:user) { create(:user, confirmation_digest: digest, confirmed_at: nil) }
  let(:account) { user.account }
  let(:email) { user.email }
  let(:session_manager) do
    SessionManager.new(session: OpenStruct.new, cookies: OpenStruct.new)
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      confirmAccount(input: {
        email: "#{email}",
        token: "#{input_token}"
      }) {
        viewer {
          ... on User {
            id
            confirmed
          }
          ... on Specialist {
            id
            confirmed
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
      context: {session_manager: session_manager}
    )
  end

  it 'returns the viewer' do
    viewer = response['data']['confirmAccount']['viewer']
    pp viewer
    expect(viewer['confirmed']).to be_truthy
  end

  it 'confirms the account' do
    expect(account.reload.confirmed_at).to be_nil
    response
    expect(account.reload.confirmed_at).to_not be_nil
  end

  it 'logs in the user' do
    expect(session_manager).to receive(:login).with(account)
    response
  end

  context 'when the account has already been confirmed' do
    let(:user) do
      create(:user, confirmation_digest: digest, confirmed_at: 2.hours.ago)
    end

    it 'returns an error' do
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('ALREADY_CONFIRMED')
    end

    it 'does not login the user' do
      expect(session_manager).to_not receive(:login)
      response
    end
  end

  context 'when the token is invalid' do
    let(:input_token) { Token.new }

    it 'returns an error' do
      error = response['errors'][0]
      expect(error['extensions']['code']).to eq('INVALID_CONFIRMATION_TOKEN')
    end

    it 'does not login the user' do
      expect(session_manager).to_not receive(:login)
      response
    end
  end
end
