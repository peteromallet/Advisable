require 'rails_helper'

describe Mutations::SendConsultationRequest do
  let!(:consultation) {
    create(:consultation, status: "Request Started", topic: nil)
  }
  let(:topic) { "Testing" }

  let(:query) { %|
    mutation {
      sendConsultationRequest(input: {
        consultation: "#{consultation.uid}",
        topic: "#{topic}"
      }) {
        consultation {
          id
        }
      }
    }
  |}

  before :each do
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
  end

  it "sets the status to 'Request Completed'" do
    expect {
      AdvisableSchema.execute(query)
    }.to change {
      consultation.reload.status
    }.from("Request Started").to("Request Completed")
  end

  it "sets the consultation topic" do
    expect {
      AdvisableSchema.execute(query)
    }.to change {
      consultation.reload.topic
    }.from(nil).to("Testing")
  end
end