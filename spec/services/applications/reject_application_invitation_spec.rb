require 'rails_helper'

RSpec.describe Applications::RejectApplicationInvitation do
  let(:application) { create(:application, status: "Invited To Apply") }
  let(:reason) { "Rejection reason" }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the application status to 'Invitation Rejected'" do
    expect {
      Applications::RejectApplicationInvitation.call(application_id: application.airtable_id, reason: reason)
    }.to change {
      application.reload.status
    }.from("Invited To Apply").to("Invitation Rejected")
  end

  it "sets the application invitation_rejection_reason" do
    expect {
      Applications::RejectApplicationInvitation.call(application_id: application.airtable_id, reason: reason)
    }.to change {
      application.reload.invitation_rejection_reason
    }.from(nil).to(reason)
  end

  it "syncs the record to airtable" do
    allow(Application).to receive(:find_by_uid_or_airtable_id).and_return(application)
    expect(application).to receive(:sync_to_airtable)
    Applications::RejectApplicationInvitation.call(application_id: application.airtable_id, reason: reason)
  end

  context 'when the record fails to save' do
    it 'raises an error' do
      allow_any_instance_of(Application).to receive(:save).and_return(false)
      expect {
        Applications::RejectApplicationInvitation.call(application_id: application.airtable_id, reason: reason)
      }.to raise_error(Service::Error, "applications.failedToReject")
    end
  end
end
