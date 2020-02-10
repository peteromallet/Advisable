require 'rails_helper'

describe Mutations::CreateSetupIntent do
  let(:user) do
    create(:user, setup_intent_status: nil, stripe_setup_intent_id: nil)
  end
  let(:query) do
    <<-GRAPHQL
    mutation {
      createSetupIntent(input: {}) {
        secret
        errors {
          code
        }
      }
    }
    GRAPHQL
  end

  before :each do
    intent = double(Stripe::SetupIntent, id: '1234', client_secret: '1234')
    allow(Stripe::SetupIntent).to receive(:create).and_return(intent)
  end

  let(:context) { { current_user: user } }

  it 'returns the setup intent secret' do
    response = AdvisableSchema.execute(query, context: context)
    secret = response['data']['createSetupIntent']['secret']
    expect(secret).to eq('1234')
  end

  it 'sets the setup_intent_status to "pending"' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      user.reload.setup_intent_status
    }.from(nil)
      .to('pending')
  end

  it 'stores the stripe_setup_intent_id' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      user.reload.stripe_setup_intent_id
    }.from(nil)
      .to('1234')
  end

  context 'when not logged in' do
    let(:context) { { current_user: nil } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['createSetupIntent']['errors'][0]['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context 'when logged in as a specialist' do
    let(:context) { { current_user: create(:specialist) } }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['data']['createSetupIntent']['errors'][0]['code']
      expect(error).to eq('notAuthorized')
    end
  end
end
