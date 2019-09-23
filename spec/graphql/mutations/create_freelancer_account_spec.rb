require 'rails_helper'

describe Mutations::CreateFreelancerAccount do
  let(:project) { create(:project) }
  let(:skill) { create(:skill, name: "Marketing") }
  let(:skill_name) { skill.name }
  let(:email) { "test@test.com" }

  let(:query) { %|
    mutation {
      createFreelancerAccount(input: {
        firstName: "Test",
        lastName: "Account",
        email: "#{email}",
        phone: "0861234567",
        password: "testing123",
        skills: ["#{skill_name}"],
        pid: "#{project.try(:airtable_id)}",
        campaignName: "campaignName",
        campaignSource: "campaignSource",
        referrer: "referrer"
      }) {
        token
      }
    }
  |}

  before :each do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "Creates a new specialist" do
    expect {
      response = AdvisableSchema.execute(query)
    }.to change {
      Specialist.count
    }.by(1)
  end

  it 'Adds the provided skills' do
    AdvisableSchema.execute(query)
    specialist = Specialist.order(:created_at).last
    expect(specialist.skills).to include(skill)
  end

  it 'Creates an application invitation if a PID is provided' do
    AdvisableSchema.execute(query)
    specialist = Specialist.order(:created_at).last
    expect(specialist.applications.first.project).to eq(project)
  end

  it 'sends the confirmation email' do
    expect_any_instance_of(Specialist).to receive(:send_confirmation_email)
    AdvisableSchema.execute(query)
  end

  context "when no pid is provided" do
    let(:project) { nil }

    it "doesn't create any application record" do
      AdvisableSchema.execute(query)
      specialist = Specialist.order(:created_at).last
      expect(specialist.applications).to be_empty
    end
  end

  context "When given a skill that doesn't exist" do
    let(:skill_name) { "Nope" }
    
    it "returns an error" do
      response = AdvisableSchema.execute(query)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("skillNotFound")
    end
  end

  context "When given an email that is already been used" do
    let(:user) { create(:user) }
    let(:email) { user.email.upcase }
    
    it "returns an error" do
      response = AdvisableSchema.execute(query)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("emailTaken")
    end
  end

  it "sets the first_name" do
    AdvisableSchema.execute(query)
    specialist = Specialist.last
    expect(specialist.first_name).to eq("Test")
  end

  it "sets the last_name" do
    AdvisableSchema.execute(query)
    specialist = Specialist.last
    expect(specialist.last_name).to eq("Account")
  end

  it "sets the email" do
    AdvisableSchema.execute(query)
    specialist = Specialist.last
    expect(specialist.email).to eq(email)
  end

  it "sets the phone_number" do
    AdvisableSchema.execute(query)
    specialist = Specialist.last
    expect(specialist.phone_number).to eq("0861234567")
  end
end