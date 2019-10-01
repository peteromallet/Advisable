require "rails_helper"

describe Mutations::CreateOffPlatformProject do
  let(:specialist) { create(:specialist) }
  let(:client_name) { "Dunder Mifflen" }
  let(:confidential) { false }
  let(:industry) { "Advertising" }
  let(:client_description) { "Client Description" }
  let(:skills) { ["Sales"] }
  let(:requirements) { "Requirements" }
  let(:results) { "results" }
  let(:contact_name) { "Jane Doe" }
  let(:company_type) { "Startup" }
  let(:contact_job_title) { "CEO" }
  let(:can_contact) { true }
  let(:description) { "description" }
  let(:public_use) { true }

  let(:query) { %|
    mutation {
      createOffPlatformProject(input: {
        specialistId: "#{specialist.airtable_id}",
        clientName: "#{client_name}",
        confidential: #{confidential},
        industry: "#{industry}",
        skills: #{skills},
        companyType: "#{company_type}",
        publicUse: #{public_use},
        contactName: "#{contact_name}",
        contactJobTitle: "#{contact_job_title}",
        description: "#{description}",
      }) {
        previousProject {
          project {
            ... on OffPlatformProject {
              clientName
              industry
              description
              clientDescription
              skills
              results
              contactFirstName
              contactLastName
              contactJobTitle
            }
          }
        }
        errors {
          code
        }
      }
    }  
  |}

  before :each do
    create(:industry, name: industry)
    skills.each do |skill|
      create(:skill, name: skill)
    end

    allow_any_instance_of(OffPlatformProject).to receive(:sync_to_airtable)
  end

  it "creates a new off platform project" do
    expect {
      response = AdvisableSchema.execute(query)
    }.to change {
      specialist.off_platform_projects.count
    }.by(1)
  end

  describe "response" do
    let(:response) { AdvisableSchema.execute(query) }
    let(:project) {
      response["data"]["createOffPlatformProject"]["previousProject"]["project"]
    }

    it "includes the clientName" do
      expect(project["clientName"]).to eq(client_name)
    end

    context "when confidential is true" do
      let(:confidential) { true }
      
      it "masks the clientName" do
        expect(project["clientName"]).to eq("#{industry} Company")
      end
    end

    it "sets the industry" do
      expect(project["industry"]).to eq(industry)
    end

    it "sets the description" do
      expect(project["description"]).to eq(description)
    end

    it "sets the skills" do
      expect(project["skills"]).to eq(skills)
    end

    it "sets the contactFirstName" do
      expect(project["contactFirstName"]).to eq("Jane")
    end

    it "sets the contactLastName" do
      expect(project["contactLastName"]).to eq("Doe")
    end

    it "sets the contactJobTitle" do
      expect(project["contactJobTitle"]).to eq("CEO")
    end

    context "when a Service::Error is thrown" do
      before :each do
        error = Service::Error.new("service_error")
        allow(OffPlatformProjects::Create).to receive(:call).and_raise(error)
      end

      it "returns an error" do
        error = response["data"]["createOffPlatformProject"]["errors"][0]
        expect(error["code"]).to eq("service_error")
      end
    end
  end
end