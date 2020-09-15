require 'rails_helper'

RSpec.describe Applications::UpdateStatus do
  let(:application) { create(:application, status: "Applied") }
  let(:airtable_record) {
    Airtable::Application.new({
      id: "rec_123",
      fields: {}
    })
  }

  before do
    allow(Airtable::Application).to receive(:find).with(application.airtable_id)
      .and_return(airtable_record)
  end

  it "updates a given applications status" do
    expect(airtable_record).to receive(:save)
    update = Applications::UpdateStatus.call(
      id: application.id,
      status: "Application Accepted"
    )
    expect(update.ok?).to be_truthy
    expect(airtable_record["Application Status"]).to eq("Application Accepted")
    expect(application.reload.status).to eq("Application Accepted")
  end
end
