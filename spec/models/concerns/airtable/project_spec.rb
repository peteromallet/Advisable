require 'rails_helper'

describe Airtable::Project do
  before do
    stub_request(:get, /Projects\/rec_123/).to_return(status: 200, body: {
      id: "rec_123",
      fields: {
        "Project": "Testing"
      }
    }.to_json)
  end

  context "when there is no existing project record" do
    it "creates a new project" do
      record = Airtable::Project.find("rec_123")
      expect { record.sync }.to change { Project.count }.by(1)
      project = Project.last
      expect(project.airtable_id).to eq('rec_123')
      expect(project.name).to eq('Testing')
    end
  end

  context "When there is an existing project record" do
    it "updates the existing record" do
      project = create(:project, airtable_id: "rec_123", name: "Existing")
      record = Airtable::Project.find("rec_123")
      record.sync
      project.reload
      expect(project.name).to eq("Testing")
    end
  end
end
