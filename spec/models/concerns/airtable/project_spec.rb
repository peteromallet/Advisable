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
