require "rails_helper"

describe Interviews::RequestMoreTimes do
  before :each do
    at_recrd = double(Airtable::Interview)
    allow(at_recrd).to receive(:[]=)
    allow(at_recrd).to receive(:save)
    allow(Airtable::Interview).to receive(:find).and_return(at_recrd)
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