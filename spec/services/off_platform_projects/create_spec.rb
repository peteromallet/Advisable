require "rails_helper"

describe OffPlatformProjects::Create do
  let(:specialist) { create(:specialist) }

  let(:attributes) {
    {
      client_name: "Test Corp",
      industry: "Digital Marketing",
      contact_name: "Jane Doe",
      contact_job_title: "Head of Product",
      client_description: "...",
      description: "...",
      requirements: "...",
      results: "...",
      skills: [
        "Marketing"
      ],
      confidential: false,
      can_contact: true,
      contact_email: "test@test.com",
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

  context "When the validation method is Client" do
    let(:project) {
      OffPlatformProjects::Create.call(
        specialist: specialist,
        attributes: attributes.merge({
          validation_method: "Client"
        })
      )
    }

    it "sets validated_by_client to false" do
      expect(project.validated_by_client).to be_falsey
    end

    it "sets the validation_status to Pending" do
      expect(project.validation_status).to eq("Pending")
    end
  end

  context "When the validation method is URL" do
    let(:project) {
      OffPlatformProjects::Create.call(
        specialist: specialist,
        attributes: attributes.merge({
          validation_method: "URL"
        })
      )
    }

    it "sets validated_by_client to true" do
      expect(project.validated_by_client).to be_truthy
    end

    it "sets the validation_status to Pending" do
      expect(project.validation_status).to eq("Pending")
    end
  end

  context "When the validation method is None" do
    let(:project) {
      OffPlatformProjects::Create.call(
        specialist: specialist,
        attributes: attributes.merge({
          validation_method: "None"
        })
      )
    }

    it "sets validated_by_client to false" do
      expect(project.validated_by_client).to be_falsey
    end

    it "sets the validation_status to Validation Failed" do
      expect(project.validation_status).to eq("Validation Failed")
    end
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