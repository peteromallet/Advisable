require 'rails_helper'

describe Mutations::CreateConsultation do
  let!(:specialist) { create(:specialist) }
  let(:skill) { create(:skill) }
  let(:first_name) { "John" }
  let(:last_name) { "Doe" }
  let(:email) { "test@test.com" }
  let(:company) { "Testing" }
  let(:skill_name) { skill.name }

  let(:query) { %|
    mutation {
      createConsultation(input: {
        specialist: "#{specialist.uid}",
        firstName: "#{first_name}",
        lastName: "#{last_name}",
        email: "#{email}",
        company: "#{company}",
        skill: "#{skill_name}",
      }) {
        consultation {
          id
        }
      }
    }
  |}

  before :each do 
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(Client).to receive(:sync_to_airtable)
  end

  it "creates a new consultation record" do
    expect {
      AdvisableSchema.execute(query)
    }.to change {
      Consultation.count
    }.by(1)
  end

  context "when a consultation record already exists" do
    let!(:consultation) { create(:consultation, user: user, status: "Request Started", specialist: specialist) }
    let!(:user) { create(:user, email: email) }

    it "does not create a new consultation record" do
      expect {
        AdvisableSchema.execute(query)
      }.not_to change {
        Consultation.count
      }
    end
  end

  context "when a freelancers email is provided" do
    let!(:specialist) { create(:specialist, email: email) }

    it "raises an error" do
      response = AdvisableSchema.execute(query)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("emailBelongsToFreelancer")
    end
  end

  context "when the skill does not exist" do
    let(:skill_name) { "Doesnt Exist" }

    it "raises an error" do
      response = AdvisableSchema.execute(query)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("notFound")
    end
  end
end