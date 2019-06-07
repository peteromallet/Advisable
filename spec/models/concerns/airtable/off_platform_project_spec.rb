require "rails_helper"

describe Airtable::OffPlatformProject do


  context 'when Okay with naming client is Yes' do
    it 'sets confidential to false' do
      record = create(:off_platform_project, confidential: true)
      airtable = Airtable::OffPlatformProject.new({
        "Okay with naming client" => "Yes",
        "Skills Required" => []
      }, id: record.airtable_id)
      expect { airtable.sync }.to change {
        record.reload.confidential
      }.from(true).to(false)
    end
  end

  context 'when Okay with naming client is blank' do
    it 'sets confidential to true' do
      record = create(:off_platform_project, confidential: false)
      airtable = Airtable::OffPlatformProject.new({
        "Okay with naming client" => nil,
        "Skills Required" => []
      }, id: record.airtable_id)
      expect { airtable.sync }.to change {
        record.reload.confidential
      }.from(false).to(true)
    end
  end

  describe "#push_data" do
    let(:project) {
      create(:off_platform_project, {
        industry: "Testing",
        contact_first_name: "John",
        contact_last_name: "Doe",
        contact_job_title: "CEO",
        client_name: "Test Inc.",
        client_description: "Client Description",
        description: "Description",
        results: "Results",
        confidential: true,
        requirements: "Requirements",
        contact_email: "test@test.com",
        validation_method: "URL",
        validation_url: "https://test.com",
        validation_status: "pending",
        validated_by_client: false
      })
    }

    let(:airtable) { Airtable::OffPlatformProject.new({}, id: project.airtable_id) }

    it "syncs the data" do
      skill_a = create(:skill)
      create(:project_skill, project: project, skill: skill_a)
      expect(airtable).to receive(:[]=).with("Client Industry", "Testing")
      expect(airtable).to receive(:[]=).with("Client Contact First Name", "John")
      expect(airtable).to receive(:[]=).with("Client Contact Last Name", "Doe")
      expect(airtable).to receive(:[]=).with("Client Contact Job Title", "CEO")
      expect(airtable).to receive(:[]=).with("Client Name", "Test Inc.")
      expect(airtable).to receive(:[]=).with("Client Description", project.client_description) 
      expect(airtable).to receive(:[]=).with("Project Description", project.description)
      expect(airtable).to receive(:[]=).with("Results Description", project.results)
      expect(airtable).to receive(:[]=).with("Primary Skill Required", project.primary_skill)
      expect(airtable).to receive(:[]=).with("Specialist Requirement Description", project.requirements)
      expect(airtable).to receive(:[]=).with("Client Contact Email Address", project.contact_email)
      expect(airtable).to receive(:[]=).with("Validation Method", project.validation_method)
      expect(airtable).to receive(:[]=).with("Validation URL", project.validation_url)
      expect(airtable).to receive(:[]=).with("Okay with naming client", "No")
      expect(airtable).to receive(:[]=).with("Okay To Contact", "No")
      expect(airtable).to receive(:[]=).with("Specialist", [project.specialist.airtable_id])
      expect(airtable).to receive(:[]=).with("Skills Required", [skill_a.airtable_id])
      expect(airtable).to receive(:[]=).with("Advisable Validation Status", project.validation_status)
      expect(airtable).to receive(:[]=).with("Validated By Client", "No")
      expect(airtable).to receive(:[]=).with("Validation Explanation", project.validation_explanation)
      airtable.push(project)
    end
  end
end