require "rails_helper"

describe Mutations::UpdateProfile do
  let(:skill) { create(:skill) }
  let!(:country) { create(:country, name: "Ireland") }
  let(:specialist) {
    create(:specialist, {
      bio: nil,
      city: nil,
      country: nil,
      remote: false
    })
  }

  let(:query) { %|
    mutation {
      updateProfile(input: {
        bio: "This is the bio",
        skills: ["#{skill.name}"],
        city: "Dublin",
        country: "IE",
        remote: true
      }) {
        specialist {
          bio
          city
          remote
          skills
          country {
            name
          }
        }
      }
    }  
  |}

  let(:response) {
    AdvisableSchema.execute(query, context: {
      current_user: specialist
    })
  }

  before :each do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it "updates the bio" do
    bio = response["data"]["updateProfile"]["specialist"]["bio"]
    expect(bio).to eq("This is the bio")
  end

  it "updates the city" do
    city = response["data"]["updateProfile"]["specialist"]["city"]
    expect(city).to eq("Dublin")
  end

  it "updates the country" do
    country = response["data"]["updateProfile"]["specialist"]["city"]
    expect(country).to_not be_nil
  end

  it "updates the remote attribute" do
    remote = response["data"]["updateProfile"]["specialist"]["remote"]
    expect(remote).to be_truthy
  end

  it "updates the skills" do
    skills = response["data"]["updateProfile"]["specialist"]["skills"]
    expect(skills).to eq([skill.name])
  end

  context "when a Service::Error is thrown" do
    before :each do
      error = Service::Error.new("service_error")
      allow(Specialists::UpdateProfile).to receive(:call).and_raise(error)
    end

    it "returns an error" do
      error = response["errors"][0]["extensions"]
      expect(error["code"]).to eq("failedToUpdate")
    end
  end
end