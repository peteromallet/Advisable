# frozen_string_literal: true

require "rails_helper"

RSpec.describe Projects::Confirm do
  context "when the project is pending approval" do
    let(:project) { create(:project, status: "Brief Pending Confirmation") }

    before do
      allow(project).to receive(:sync_to_airtable)
    end

    it "sets the status to Brief Confirmed" do
      expect {
        described_class.call(project: project)
      }.to change {
        project.reload.status
      }.from("Brief Pending Confirmation").to("Brief Confirmed")
    end

    it 'returns the project' do
      response = described_class.call(project: project)
      expect(response).to be_a(Project)
    end

    it 'syncs with airtable' do
      expect(project).to receive(:sync_to_airtable)
      described_class.call(project: project)
    end
  end

  context "when the project status is 'Brief Confirmed'" do
    let(:project) { build(:project, status: "Brief Confirmed") }

    it "returns the project" do
      response = described_class.call(project: project)
      expect(response).to eq(project)
    end
  end

  context "when the project is not pending approval" do
    let(:project) { instance_double(Project, status: "Draft") }

    it "throws a service error" do
      expect {
        described_class.call(project: project)
      }.to raise_error(Service::Error)
    end
  end

  context "when the deposit owed has not been paid" do
    let(:project) { instance_double(Project, status: "Brief Pending Confirmation", deposit_owed: 100_00) }

    it "throws a service error" do
      expect {
        described_class.call(project: project)
      }.to raise_error(Service::Error)
    end
  end
end
