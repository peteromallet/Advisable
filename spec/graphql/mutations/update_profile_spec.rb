# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateProfile do
  let(:skill) { create(:skill) }
  let(:specialist) { create(:specialist, {bio: nil, city: nil, country: nil, remote: false}) }
  let(:extra_context) { {} }
  let(:query) do
    <<-GRAPHQL
    mutation {
      updateProfile(input: {
        firstName: "Angela",
        lastName: "Noelle",
        email: "staging+angela@advisable.com",
        bio: "This is the bio",
        skills: ["#{skill.name}"],
        city: "Dublin",
        country: "IE",
        remote: true
      }) {
        specialist {
          firstName
          lastName
          email
          bio
          city
          remote
          skills {
            name
          }
          country {
            name
          }
        }
      }
    }
    GRAPHQL
  end

  let(:response) do
    AdvisableSchema.execute(query, context: {current_user: specialist}.merge(extra_context))
  end

  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it "syncs to airtable" do
    expect_any_instance_of(Specialist).to receive(:sync_to_airtable)
    response
  end

  it "updates first name" do
    first_name = response["data"]["updateProfile"]["specialist"]["firstName"]
    expect(first_name).to eq("Angela")
  end

  it "updates last name" do
    last_name = response["data"]["updateProfile"]["specialist"]["lastName"]
    expect(last_name).to eq("Noelle")
  end

  it "updates the email" do
    email = response["data"]["updateProfile"]["specialist"]["email"]
    expect(email).to eq("staging+angela@advisable.com")
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
    create(:country, alpha2: "IE", name: "Ireland")
    country = response["data"]["updateProfile"]["specialist"]["country"]
    expect(country).not_to be_nil
  end

  it "updates the remote attribute" do
    remote = response["data"]["updateProfile"]["specialist"]["remote"]
    expect(remote).to be_truthy
  end

  it "updates the skills" do
    skills = response["data"]["updateProfile"]["specialist"]["skills"]
    expect(skills).to eq([{"name" => skill.name}])
  end

  context "when responsible account" do
    let(:account) { create(:account) }
    let(:extra_context) { {current_account: account} }

    it "saves the responsible person" do
      response
      specialist.reload_log_data
      expect(specialist.log_data.responsible_id).to eq(account.id)
    end
  end

  context "when Specialist fails to save" do
    it "returns an error" do
      allow_any_instance_of(Specialist).to receive(:save).and_return(false)
      error = response["errors"][0]["extensions"]
      expect(error["code"]).to eq("failedToUpdate")
    end
  end

  context "when there is no viewer" do
    it "returns an error" do
      response = AdvisableSchema.execute(query, context: {current_user: nil})
      error_code = response["errors"][0]["extensions"]["code"]
      expect(error_code).to eq("notAuthenticated")
    end
  end

  context "when there is a User logged in" do
    it "returns an error" do
      response = AdvisableSchema.execute(query, context: {current_user: create(:user)})
      error_code = response["errors"][0]["extensions"]["code"]
      expect(error_code).to eq("notAuthenticated")
    end
  end
end
