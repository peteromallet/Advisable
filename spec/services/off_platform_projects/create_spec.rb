require "rails_helper"

describe OffPlatformProjects::Create do
  let(:specialist) { create(:specialist) }

  let(:attributes) {
    {
      client_name: "Test Corp",
      industry: "Digital Marketing",
      contact_name: "Jane Doe",
      contact_job_title: "Head of Product",
      description: "...",
      results: "...",
      skills: [
        "Marketing"
      ],
      confidential: false,
      can_contact: true,
      validation_status: "Pending"
    }
  }

  before :each do
    create(:skill, name: "Marketing")

    airtable = double(Airtable::OffPlatformProject)
    allow(airtable).to receive(:push)
    allow(Airtable::OffPlatformProject).to receive(:new).and_return(airtable)
  end

  it "Creates a new OffPlatformProject for the given specialist" do
    expect do
      OffPlatformProjects::Create.call(
        specialist: specialist,
        attributes: attributes
      )
    end.to change {
      specialist.off_platform_projects.count
    }
  end

  it "sets the validation_status to Pending" do
    project = OffPlatformProjects::Create.call(
      specialist: specialist,
      attributes: attributes
    )

    expect(project.validation_status).to eq("Pending")
  end


  context "When a skill does not exist in database" do
    it "attempts to sync it from airtable" do
      airtable = double(Airtable::Skill)
      expect(Airtable::Skill).to receive(:find_by_name).with("Testing").and_return(airtable)
      expect(airtable).to receive(:sync).and_return(Skill.new(name: "Testing"))
      OffPlatformProjects::Create.call(
        specialist: specialist,
        attributes: attributes.merge({
          skills: ["Marketing", "Testing"]
        })
      )
    end
  end
end