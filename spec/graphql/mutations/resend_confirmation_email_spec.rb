require 'rails_helper'

RSpec.describe Mutations::ResendConfirmationEmail do
  let(:account) { create(:account, confirmation_digest: nil) }
  let(:user) { create(:user, account: account) }
  let(:query) do
    <<-GRAPHQL
      mutation {
        resendConfirmationEmail(input: {}) {
          viewer {
            ... on User {
              id
            }
          }
        }
      }
    GRAPHQL
  end

  before :each do
    mail = double('confirmation email')
    allow(mail).to receive(:deliver_later)
    allow(UserMailer).to receive(:confirm).and_return(mail)
  end

  context 'when a user is signed in' do
    it 'returns the user' do
      response = AdvisableSchema.execute(query, context: {current_user: user})
      user = response['data']['resendConfirmationEmail']['viewer']
      expect(user).to_not be_nil
    end

    it 'resends the confirmation email' do
      expect(user).to receive(:send_confirmation_email)
      AdvisableSchema.execute(query, context: {current_user: user})
    end

    it 'sets the confirmation digest' do
      expect(user.account.reload.confirmation_digest).to be_nil
      AdvisableSchema.execute(query, context: {current_user: user})
      expect(user.account.reload.confirmation_digest).to_not be_nil
    end
  end

  context 'when a user is not logged in' do
    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: {current_user: nil})
      errors = response['errors']
      expect(errors[0]['extensions']['code']).to eq('notAuthenticated')
    end
  end
end
