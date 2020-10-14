require 'rails_helper'

RSpec.describe Mutations::ResetPassword do
  let(:token) { Token.new }
  let(:input_token) { token }
  let(:digest) { Token.digest(token) }
  let(:account) { create(:account, reset_sent_at: 1.hour.ago, reset_digest: digest) }
  let!(:user) { create(:user, account: account) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      resetPassword(input: {
        email: "#{account.email}",
        token: "#{input_token}",
        password: "newpassword123",
        passwordConfirmation: "newpassword123",
      }) {
        reset
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  it 'returns reset true' do
    response = AdvisableSchema.execute(query)
    reset = response['data']['resetPassword']['reset']
    expect(reset).to be_truthy
  end

  it 'changes the users password' do
    previous_digest = user.password_digest
    AdvisableSchema.execute(query)
    expect(user.reload.password_digest).to_not eq(previous_digest)
  end

  context 'when the token is invalid' do
    let(:input_token) { Token.new }

    it 'returns an error' do
      response = AdvisableSchema.execute(query)
      error = response['data']['resetPassword']['errors'][0]
      expect(error['code']).to eq('Invalid token')
    end
  end

  context 'when the password reset has expired' do
    let(:account) { create(:account, reset_sent_at: 3.hours.ago, reset_digest: digest) }

    it 'returns an error' do
      response = AdvisableSchema.execute(query)
      error = response['data']['resetPassword']['errors'][0]
      expect(error['code']).to eq('Password reset has expired')
    end
  end
end
