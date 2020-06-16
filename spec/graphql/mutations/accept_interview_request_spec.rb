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

  it 'updates the start date, phone number and status' do
    data = {}
    expect(specialist.reload.phone).to be_nil

    assert_enqueued_jobs(2, only: [InterviewScheduleJob, InterviewChatJob]) do
      response = AdvisableSchema.execute(query, context: {})
      data = response['data']['acceptInterviewRequest']['interview']
    end

    expect(specialist.reload.phone).to eq('0123456789')
    expect(data['startsAt']).to_not be_nil
    expect(data['status']).to eq(Interview::STATUSES[:scheduled])
  end
end
