require 'rails_helper'

describe Mutations::ResendInterviewRequest do
  let(:user) { create(:user, availability: []) }
  let(:interview) { create(:interview, time_zone: 'Perth', user: user) }
  let(:time) { 2.days.from_now.utc.iso8601 }

  let(:query) do
    <<-GRAPHQL
    mutation {
      resendInterviewRequest(input: {
        id: "#{interview.airtable_id}",
        availability: ["#{time}"],
        timeZone: "Dublin",
      }) {
        interview {
          status
          timeZone
          user {
            availability
          }
        }
        errors {
          code
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

  it 'updates the users availability' do
    response = AdvisableSchema.execute(query)
    user = response['data']['resendInterviewRequest']['interview']['user']
    expect(user['availability']).to eq([time])
  end

  it 'updates the interview timezone' do
    response = AdvisableSchema.execute(query)
    timeZone =
      response['data']['resendInterviewRequest']['interview']['timeZone']
    expect(timeZone).to eq('Dublin')
  end

  context 'when a Service::Error is thrown' do
    it 'includes it in the response' do
      error = Service::Error.new('service_error')
      allow(Interviews::ResendInterviewRequest).to receive(:call).and_raise(
        error
      )
      response = AdvisableSchema.execute(query)
      errors = response['data']['resendInterviewRequest']['errors']
      expect(errors[0]['code']).to eq('service_error')
    end
  end
end
