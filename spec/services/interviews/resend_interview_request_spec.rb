require "rails_helper"

describe Interviews::ResendInterviewRequest do
  let(:interview) { create(:interview, starts_at: nil, time_zone: "Dublin/Ireland", status: "Need More Time Options") }
  let(:airtable_record) { double(Airtable::Interview) }

  before :each do
    allow(airtable_record).to receive(:[]=)
    allow(airtable_record).to receive(:save)
    allow(Airtable::Interview).to receive(:find).with(interview.airtable_id).and_return(airtable_record)
  end

  it "updates the users availability" do
    time = 1.day.from_now
    expect(interview.user.reload.availability).to_not include(time)
    Interviews::ResendInterviewRequest.call(
      interview: interview,
      availability: [
        time
      ],
      time_zone: "Dublin/Ireland"
    )
    expect(interview.user.reload.availability).to include(time)
  end

  it "updates the interview time zone" do
    expect {
      Interviews::ResendInterviewRequest.call(
        interview: interview,
        availability: [1.day.from_now],
        time_zone: "America/New_York"
      )
    }.to change { interview.time_zone }.from("Dublin/Ireland").to("America/New_York")
  end

  it "sets the call status to More Time Options Added" do
    expect {
      Interviews::ResendInterviewRequest.call(
        interview: interview,
        availability: [1.day.from_now],
        time_zone: "America/New_York"
      )
    }.to change { interview.status }.from("Need More Time Options").to("More Time Options Added")
  end

  it "updates the call status in airtable" do
    expect(airtable_record).to receive(:[]=).with("Call Status", "More Time Options Added")
    expect(airtable_record).to receive(:save)
    Interviews::ResendInterviewRequest.call(
      interview: interview,
      availability: [1.day.from_now],
      time_zone: "America/New_York"
    )
  end
end