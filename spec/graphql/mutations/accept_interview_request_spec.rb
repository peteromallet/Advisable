require 'rails_helper'

describe Mutations::AcceptInterviewRequest do
  let(:specialist) { create(:specialist) }
  let(:application) { create(:application, specialist: specialist) }
  let(:interview) { create(:interview, application: application) }

  let(:time) { 2.days.from_now.strftime('%Y-%m-%dT%H:%M:00Z') }

  let(:query) do
    <<-GRAPHQL
      mutation {
        acceptInterviewRequest(input: {
          id: "#{interview.airtable_id}",
          startsAt: "#{2.days.from_now.iso8601}",
          phoneNumber: "0123456789"
        }) {
          interview {
            id
            status
            startsAt
          }
          errors
        }
      }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it 'sets the interview status to Call Scheduled' do
    response = AdvisableSchema.execute(query, context: {})
    status = response['data']['acceptInterviewRequest']['interview']['status']
    expect(status).to eq('Call Scheduled')
  end

  it 'sets the startsAt attribute' do
    response = AdvisableSchema.execute(query, context: {})
    starts_at =
      response['data']['acceptInterviewRequest']['interview']['startsAt']
    expect(starts_at).to_not be_nil
  end

  it 'sets the specialist phone number' do
    expect { AdvisableSchema.execute(query, context: {}) }.to change {
      specialist.reload.phone
    }.from(nil).to('0123456789')
  end
end
