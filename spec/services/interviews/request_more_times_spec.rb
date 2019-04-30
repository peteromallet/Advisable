require "rails_helper"

describe Interviews::RequestMoreTimes do
  before :each do
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
  end

  it "Sets the status to Need More Time Options" do
    interview = create(:interview, status: "Call Requested")
    expect {
      Interviews::RequestMoreTimes.call(interview: interview)
    }.to change {
      interview.reload.status
    }.from("Call Requested").to("Need More Time Options")
  end

  it "raises an error if the status is not Call Requested" do
    interview = create(:interview, status: "Need More Time Options")
    expect {
      Interviews::RequestMoreTimes.call(interview: interview)
    }.to raise_error(Service::Error, "interview.not_requested")
  end
end