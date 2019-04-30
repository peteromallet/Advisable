
require "rails_helper"

describe Mutations::ConvertToSelfService do
  let(:user) { create(:user) }
  let(:project) { create(:project, status: "Project Created", service_type: "Assisted") }
  let(:skill_name) { "Skill Name" }
  let(:service_type) { "Assisted" }
  let(:context) {{ current_user: user }}
  let(:query) { %|
    mutation {
      createProject(input: {
        primarySkill: "#{skill_name}",
        serviceType: "#{service_type}"
      }) {
        project {
          id
          status
          serviceType
        }
        errors {
          code
        }
      }
    }
  |}

  before :each do
    create(:skill, name: "Skill Name") 
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it "creates a new project" do
    expect {
      AdvisableSchema.execute(query, context: context)
    }.to change {
      user.projects.count
    }.by(1)
  end

  context "when there is not authenticated user" do
    let(:context) {{ current_user: nil }}

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["createProject"]["errors"][0]
      expect(error["code"]).to eq("authentication.required")
    end
  end

  it "sets the status to 'Project Created'" do
    response = AdvisableSchema.execute(query, context: context)
    status = response["data"]["createProject"]["project"]["status"]
    expect(status).to eq("Project Created")
  end

  context "when the service_type is 'Self-Service'" do
    let(:service_type) { "Self-Service" }
    
    it "sets the status to 'Brief Pending Confirmation'" do
      response = AdvisableSchema.execute(query, context: context)
      status = response["data"]["createProject"]["project"]["status"]
      expect(status).to eq("Brief Pending Confirmation")
    end
  end

  context "if the skill doesnt exist" do
    let(:skill_name) { "Doesnt Exist" }

    it "first tries to sync it from airtable" do
      skill = double(Airtable::Skill)
      expect(skill).to receive(:sync)
      expect(Airtable::Skill).to receive(:find_by_name).with("Doesnt Exist")
        .and_return(skill)
      AdvisableSchema.execute(query, context: context)
    end

    it "returns an error" do
      expect(Airtable::Skill).to receive(:find_by_name).with("Doesnt Exist").and_return(nil)
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["createProject"]["errors"][0]
      expect(error["code"]).to eq("Invalid skill")
    end
  end
end