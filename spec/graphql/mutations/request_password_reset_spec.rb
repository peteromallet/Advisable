# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::RequestPasswordReset do
  let(:account) { create(:account, reset_sent_at: nil, reset_digest: nil) }
  let!(:user) { create(:user, account: account) }
  let(:email) { account.email }
  let(:query) do
    <<-GRAPHQL
    mutation {
      requestPasswordReset(input: {
        email: "#{email}"
      }) {
        sent
      }
    }
    GRAPHQL
  end

  before do
    mail = double('confirmation email') # rubocop:disable RSpec/VerifiedDoubles
    allow(mail).to receive(:deliver_later)
    allow(AccountMailer).to receive(:reset_password).and_return(mail)
  end

  it 'returns sent true' do
    response = AdvisableSchema.execute(query, context: {})
    sent = response['data']['requestPasswordReset']['sent']
    expect(sent).to be_truthy
  end

  it 'sends a password reset email' do
    mail = double('confirmation email') # rubocop:disable RSpec/VerifiedDoubles
    expect(mail).to receive(:deliver_later)
    allow(AccountMailer).to receive(:reset_password).and_return(mail)
    AdvisableSchema.execute(query, context: {})
  end

  it 'sets the reset_digest' do
    expect(user.account.reload.reset_digest).to be_nil
    AdvisableSchema.execute(query, context: {})
    expect(user.account.reload.reset_digest).not_to be_nil
  end

  it 'sets the reset_sent_at' do
    expect(user.account.reload.reset_sent_at).to be_nil
    AdvisableSchema.execute(query, context: {})
    expect(user.account.reload.reset_sent_at).not_to be_nil
  end

  context 'when the email doesnt exist' do
    let(:email) { 'doesntexist@advisable.com' }
    let(:response) { AdvisableSchema.execute(query, context: {}) }

    it 'returns an error' do
      error = response['errors'][0]
      expect(error['message']).to eq('ACCOUNT_NOT_FOUND')
    end
  end
end
