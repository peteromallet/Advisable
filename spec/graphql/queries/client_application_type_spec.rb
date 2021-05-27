# frozen_string_literal: true

require 'rails_helper'

RSpec.describe("clientApplication query", type: :system) do
  let(:user) { create(:user, application_status: "Application Started") }
  let(:query) do
    <<-GRAPHQL
    query {
      clientApplication {
        id
        status
      }
    }
    GRAPHQL
  end

  let(:current_user) { user }
  let(:context) { {current_user: current_user} }

  def request
    AdvisableSchema.execute(query, context: context)
  end

  context 'when the application_status is started' do
    let(:user) { create(:user, application_status: "Application Started") }

    it 'the status field is "Application Started"' do
      status = request['data']['clientApplication']['status']
      expect(status).to eq('Application Started')
    end
  end

  context 'when the application_status is "Application Accepted"' do
    let(:user) { create(:user, application_status: "Application Accepted") }

    it 'the status field is "Application Accepted"' do
      status = request['data']['clientApplication']['status']
      expect(status).to eq('Application Accepted')
    end
  end

  context 'when the application_status is "Application Rejected"' do
    let(:user) { create(:user, application_status: "Application Rejected") }

    it 'the status field is "Application Rejected"' do
      status = request['data']['clientApplication']['status']
      expect(status).to eq('Application Rejected')
    end
  end
end
