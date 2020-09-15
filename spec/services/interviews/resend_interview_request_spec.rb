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

  it 'updates the users availability' do
    time = 1.day.from_now.to_s
    expect(interview.user.reload.availability).to_not include(time)
    Interviews::ResendInterviewRequest.call(
      interview: interview, availability: [time], time_zone: 'Dublin/Ireland'
    )
    expect(interview.user.reload.availability).to include(time)
  end

  it 'updates the interview time zone' do
    expect {
      Interviews::ResendInterviewRequest.call(
        interview: interview,
        availability: [1.day.from_now],
        time_zone: 'America/New_York'
      )
    }.to change { interview.time_zone }.from('Dublin/Ireland').to(
      'America/New_York'
    )
  end

  it 'sets the call status to More Time Options Added' do
    expect {
      Interviews::ResendInterviewRequest.call(
        interview: interview,
        availability: [1.day.from_now],
        time_zone: 'America/New_York'
      )
    }.to change { interview.status }.from('Need More Time Options').to(
      'More Time Options Added'
    )
  end

  it 'syncs to airtable' do
    expect(interview).to receive(:sync_to_airtable)
    Interviews::ResendInterviewRequest.call(
      interview: interview,
      availability: [1.day.from_now],
      time_zone: 'America/New_York'
    )
  end
end
