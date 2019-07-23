require 'rails_helper'

describe Applications::RejectApplicationInvitation do
  let(:application) { create(:application, status: "Applied") }
  let(:project_type) { "Fixed" }
  let(:monthly_limit) { 150 }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the application status to 'Working'" do
    expect {
      Applications::StartWorking.call(
        application: application,
        project_type: project_type,
        monthly_limit: monthly_limit
      )
    }.to change {
      application.reload.status
    }.from("Applied").to("Working")
  end

  it "sets the project type" do
    expect {
      Applications::StartWorking.call(
        application: application,
        project_type: project_type,
        monthly_limit: monthly_limit
      )
    }.to change {
      application.project_type
    }.from(nil).to(project_type)
  end

  it "sets the monthly limit" do
    expect {
      Applications::StartWorking.call(
        application: application,
        project_type: project_type,
        monthly_limit: monthly_limit
      )
    }.to change {
      application.monthly_limit
    }.from(nil).to(monthly_limit)
  end

  it 'syncs with airtable' do
    expect(application).to receive(:sync_to_airtable)
    Applications::StartWorking.call(
      application: application,
      project_type: project_type,
      monthly_limit: monthly_limit
    )
  end

  it 'triggers a webhook' do
    expect(Webhook).to receive(:process).with(application)
    Applications::StartWorking.call(
      application: application,
      project_type: project_type,
      monthly_limit: monthly_limit
    )
  end

  context 'when the application doesnt save' do
    it 'raises an error' do
      allow(application).to receive(:save).and_return(false)
      expect {
        Applications::StartWorking.call(
          application: application,
          project_type: project_type,
          monthly_limit: monthly_limit
        )
      }.to raise_error(Service::Error)
    end
  end

  context 'when an invalid project type is passed' do
    it 'raises an error' do
      expect {
        Applications::StartWorking.call(
          application: application,
          project_type: 'invalid project type',
          monthly_limit: monthly_limit
        )
      }.to raise_error(Service::Error, 'invalidProjectType')
    end
  end
end