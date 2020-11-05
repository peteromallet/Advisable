require 'rails_helper'

RSpec.describe Types::ClientApplicationType do
  let(:user) { create(:user, application_status: "Application Started") }
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
    let(:user) { create(:user, application_status: "Application Started") }

    it 'the status field is "Application Started"' do
      response = AdvisableSchema.execute(query)
      status = response['data']['clientApplication']['status']
      expect(status).to eq('Application Started')
    end
  end

  context 'when the application_status is "Application Accepted"' do
    let(:user) { create(:user, application_status: "Application Accepted") }

    it 'the status field is "Application Accepted"' do
      response = AdvisableSchema.execute(query)
      status = response['data']['clientApplication']['status']
      expect(status).to eq('Application Accepted')
    end
  end

  context 'when the application_status is "Application Rejected"' do
    let(:user) { create(:user, application_status: "Application Rejected") }

    it 'the status field is "Application Rejected"' do
      response = AdvisableSchema.execute(query)
      status = response['data']['clientApplication']['status']
      expect(status).to eq('Application Rejected')
    end
  end
end
