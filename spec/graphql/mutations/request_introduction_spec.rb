require "rails_helper"

describe Mutations::AcceptInterviewRequest do
  let(:application) { create(:application, status: "Applied") }

  let(:time) {
    2.days.from_now.strftime("%Y-%m-%dT%H:%M:00Z")
  }
  
  let(:query) { %|
    mutation {
      requestIntroduction(input: {
        applicationId: "#{application.airtable_id}",
        availability: ["#{time}"],
        timeZone: "Dublin"
      }) {
        interview {
          id
          status
          startsAt
          timeZone
        }
        errors
      }
    }
  |}

  before :each do
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    allow_any_instance_of(Types::Interview).to receive(:id).and_return("created_1234")
  end
  
  it "sets the interview status to Call Requested" do
    response = AdvisableSchema.execute(query, context: {})
    status = response["data"]["requestIntroduction"]["interview"]["status"]
    expect(status).to eq("Call Requested")
  end
    
  it "sets the interview time zone" do
    response = AdvisableSchema.execute(query, context: {})
    timeZone = response["data"]["requestIntroduction"]["interview"]["timeZone"]
    expect(timeZone).to eq("Dublin")
  end

  it "sets the application status to application accepted" do
    expect {
      AdvisableSchema.execute(query, context: {})
    }.to change {
      application.reload.status
    }.from("Applied").to("Application Accepted")
  end
end