require 'rails_helper'

describe Airtable::Project do
  before do
    stub_request(:get, /Projects\/rec_123/).to_return(status: 200, body: {
      id: "rec_123",
      fields: {
        "Project": "Testing",
        "Remote OK": "Yes, I’m open to using remote talent" 
      }
    }.to_json)
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

  context "#push" do
    it "syncs the name if it changes" do
      project = create(:project, name: "Project Name")
      project.update_attributes(name: "Test")
      record = Airtable::Project.new({})
      expect(record).to receive(:[]=).with("Project", "Test").once
      expect(record).to receive(:create)
      record.push(project)
    end

    it "doesn't sync the name if it hasnt changed" do
      project = create(:project, name: "Project Name")
      record = Airtable::Project.new({})
      expect(record).not_to receive(:[]=).with("Project", "Test")
      expect(record).to receive(:create)
      record.push(project)
    end
  end
end
