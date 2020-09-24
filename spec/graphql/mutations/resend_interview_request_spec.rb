require 'rails_helper'

RSpec.describe Mutations::ResendInterviewRequest do
  let(:user) { create(:user, availability: []) }
  let(:interview) { create(:interview, status: "Need More Time Options", time_zone: 'Perth', user: user) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      resendInterviewRequest(input: {
        id: "#{interview.airtable_id}",
      }) {
        interview {
          status
          timeZone
          user {
            availability
          }
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
  end

  it "sets the status to 'More Time Options Added'" do
    response = AdvisableSchema.execute(query)
    status = response['data']['resendInterviewRequest']['interview']['status']
    expect(status).to eq('More Time Options Added')
  end

  context 'when a Service::Error is thrown' do
    it 'includes it in the response' do
      error = Service::Error.new('service_error')
      allow(Interviews::ResendInterviewRequest).to receive(:call).and_raise(
        error
      )
      response = AdvisableSchema.execute(query)
      message = response['errors'].first["message"]
      expect(message).to eq('service_error')
    end
  end
end
