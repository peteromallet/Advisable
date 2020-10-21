require 'rails_helper'

RSpec.describe Mutations::Signup do
  let(:first_name) { 'John' }
  let(:last_name) { 'Doe' }
  let(:email) { 'test@test.com' }

  let(:query) do
    <<-GRAPHQL
    mutation {
      startClientApplication(input: {
        firstName: "#{first_name}",
        lastName: "#{last_name}",
        email: "#{email}",
      }) {
        clientApplication {
          id
          firstName
          lastName
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(Client).to receive(:sync_to_airtable)
  end

  it 'creates a new user' do
    expect { AdvisableSchema.execute(query) }.to change { User.count }.by(1)
    user = User.last
    expect(user.first_name).to eq(first_name)
    expect(user.last_name).to eq(last_name)
    expect(user.account.email).to eq(email)
    expect(user.application_status).to eq(:started)
  end

  context 'when a user account already exists with that email' do
    it 'returns an error' do
      create(
        :user,
        account: create(:account, email: email, password: 'testing123'),
        first_name: 'Michael',
        last_name: 'Scott'
      )
      response = AdvisableSchema.execute(query)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('existingAccount')
    end
  end

  context 'when a specialist account exists with that email' do
    it 'returns an error' do
      create(:specialist, account: create(:account, email: email))
      response = AdvisableSchema.execute(query)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('existingAccount')
    end
  end

  context 'when the email is blacklisted' do
    let(:email) { 'test@gmail.com' }

    it 'returns an error' do
      create(:blacklisted_domain, domain: 'gmail.com')
      response = AdvisableSchema.execute(query)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('emailNotAllowed')
    end
  end

  context 'when application already exists for that email' do
    context 'and the application status is started' do
      it 'updates that user record' do
        user =
          create(
            :user,
            account: create(:account, email: email, password: nil),
            first_name: 'Michael',
            last_name: 'Scott',
            application_status: :started
          )
        expect { AdvisableSchema.execute(query) }.not_to change { User.count }
        expect(user.reload.first_name).to eq(first_name)
        expect(user.reload.last_name).to eq(last_name)
      end
    end

    context 'and the application_status is not started' do
      it 'does not update the user' do
        user =
          create(
            :user,
            account: create(:account, email: email, password: nil),
            first_name: 'Michael',
            last_name: 'Scott',
            application_status: :accepted
          )
        expect { AdvisableSchema.execute(query) }.not_to change { User.count }
        expect(user.reload.first_name).not_to eq(first_name)
        expect(user.reload.last_name).not_to eq(last_name)
        expect(user.reload.application_status).not_to eq(:started)
      end
    end
  end
end
