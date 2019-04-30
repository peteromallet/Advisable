require "rails_helper"

describe Projects::Confirm do
  context "when the project is pending approval" do
    let(:project) { create(:project, status: "Brief Pending Confirmation") }

    before :each do
      allow(project).to receive(:sync_to_airtable)
    end

    it "sets the status to Brief Confirmed" do
      expect {
        Projects::Confirm.call(project: project)
      }.to change {
        project.reload.status
      }.from("Brief Pending Confirmation").to("Brief Confirmed")
    end

    it 'returns the project' do
      response = Projects::Confirm.call(project: project)
      expect(response).to be_a(Project)
    end

    it 'syncs with airtable' do
      expect(project).to receive(:sync_to_airtable)
      Projects::Confirm.call(project: project)
    end
  end

  context "when the project is not pending approval" do
    let(:project) { double(Project, status: "Brief Confirmed") }

    it "throws a service error" do
      expect {
        Projects::Confirm.call(project: project)
      }.to raise_error(Service::Error)
    end
  end

  context "when the deposit owed has not been paid" do
    let(:project) { double(Project, status: "Brief Pending Confirmation", deposit_owed: 100_00) }

    it "throws a service error" do
      expect {
        Projects::Confirm.call(project: project)
      }.to raise_error(Service::Error)
    end
  end
end