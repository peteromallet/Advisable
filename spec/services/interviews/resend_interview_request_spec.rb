require 'rails_helper'

RSpec.describe Interviews::ResendInterviewRequest do
  let(:interview) do
    create(
      :interview,
      starts_at: nil,
      time_zone: 'Dublin/Ireland',
      status: 'Need More Time Options'
    )
  end

  before :each do
    allow(interview).to receive(:sync_to_airtable)
  end

  it 'sets the call status to More Time Options Added' do
    expect {
      Interviews::ResendInterviewRequest.call(
        interview: interview,
      )
    }.to change { interview.status }.from('Need More Time Options').to(
      'More Time Options Added'
    )
  end

  it 'syncs to airtable' do
    expect(interview).to receive(:sync_to_airtable)
    Interviews::ResendInterviewRequest.call(
      interview: interview,
    )
  end
end
