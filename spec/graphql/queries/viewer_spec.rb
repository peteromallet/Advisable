require 'rails_helper'

RSpec.describe Types::PreviousProject do
  let(:query) do
    <<-GRAPHQL
      {
        viewer {
          ... on User {
            id
          }
          ... on Specialist {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user) }
  let(:response) do
    AdvisableSchema.execute(query, context: { current_user: user })
  end

  it 'returns a user when a client is authed' do
    expect(response['data']['viewer']['id']).to eq(user.uid)
  end

  context 'when a specialist is authed' do
    let(:user) { create(:specialist) }

    it 'returns a specialist' do
      expect(response['data']['viewer']['id']).to eq(user.uid)
    end
  end

  context 'when there is no authed user' do
    let(:user) { nil }

    it 'returns null' do
      expect(response['data']['viewer']).to be_nil
    end
  end
end
