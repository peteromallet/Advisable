require 'rails_helper'

describe Types::ClientApplicationType do
  let(:user) { create(:user, application_status: :started) }
  let(:query) do
    <<-GRAPHQL
    query {
      clientApplication(id: "#{user.uid}") {
        id
        status
      }
    }
    GRAPHQL
  end

  context 'when the application_status is started' do
    let(:user) { create(:user, application_status: :started) }

    it 'the status field is STARTED' do
      response = AdvisableSchema.execute(query)
      status = response['data']['clientApplication']['status']
      expect(status).to eq('STARTED')
    end
  end

  context 'when the application_status is accepted' do
    let(:user) { create(:user, application_status: :accepted) }

    it 'the status field is ACCEPTED' do
      response = AdvisableSchema.execute(query)
      status = response['data']['clientApplication']['status']
      expect(status).to eq('ACCEPTED')
    end
  end

  context 'when the application_status is rejected' do
    let(:user) { create(:user, application_status: :rejected) }

    it 'the status field is REJECTED' do
      response = AdvisableSchema.execute(query)
      status = response['data']['clientApplication']['status']
      expect(status).to eq('REJECTED')
    end
  end
end
