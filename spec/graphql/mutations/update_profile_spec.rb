# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateProfile do
  let(:specialist) { create(:specialist, {bio: nil, city: nil, country: nil, remote: false}) }
  let(:extra_context) { {} }
  let(:skill) { create(:skill) }
  let(:skills) { [skill.name] }
  let(:industries) { [] }
  let(:country) { create(:country) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      updateProfile(input: {
        firstName: "Angela",
        lastName: "Noelle",
        email: "staging+angela@advisable.com",
        bio: "This is the bio",
        skills: #{skills},
        industries: #{industries},
        city: "Dublin",
        country: "#{country.uid}",
        remote: true,
        username: "angela",
      }) {
        specialist {
          firstName
          lastName
          email
          username
          bio
          city
          remote
          skills {
            name
          }
          industries {
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

  it "syncs to airtable" do
    expect_any_instance_of(Specialist).to receive(:bg_sync_to_airtable)
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

  it "updates username" do
    username = response["data"]["updateProfile"]["specialist"]["username"]
    expect(username).to eq("angela")
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
      expect(error["code"]).to eq("FAILED_TO_UPDATE")
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

  describe "label subscriptions" do
    let(:skill1) { create(:skill) }
    let(:skill2) { create(:skill) }
    let(:skill3) { create(:skill) }
    let(:skills) { [skill1.name, skill2.name] }
    let(:industry1) { create(:industry) }
    let(:industry2) { create(:industry) }
    let(:industry3) { create(:industry) }
    let(:industries) { [industry1.name, industry2.name] }
    let(:country) { create(:country) }
    let(:country2) { create(:country) }

    context "when labels exist" do
      before do
        skill1.create_label!
        skill2.create_label!
        skill3.create_label!
        industry1.create_label!
        industry2.create_label!
        industry3.create_label!
        country.create_label!
        country2.create_label!
      end

      context "when new account" do
        it "subscribes specialist to skill, industry, and country labels" do
          expect(specialist.subscriptions.count).to eq(0)
          response
          expect(specialist.subscriptions.count).to eq(5)
          expect(specialist.subscriptions.pluck(:label_id)).to match_array([skill1.label.id, skill2.label.id, industry1.label.id, industry2.label.id, country.label.id])
        end
      end

      context "when adding stuff" do
        it "subscribes specialist to new skill, industry, and country labels" do
          specialist.update!(skills: [skill1], industries: [industry1], country: country2)
          expect(specialist.subscriptions.count).to eq(0)
          response
          expect(specialist.subscriptions.count).to eq(3)
          expect(specialist.subscriptions.pluck(:label_id)).to match_array([skill2.label.id, industry2.label.id, country.label.id])
        end
      end

      context "when removing stuff" do
        it "unsubscribes specialist from skill, industry, and country labels" do
          specialist.update!(skills: [skill3], industries: [industry3], country: country2)
          specialist.subscribe_to!(skill3.label)
          specialist.subscribe_to!(industry3.label)
          specialist.subscribe_to!(country2.label)
          expect(specialist.subscriptions.count).to eq(3)
          expect(specialist.subscriptions.pluck(:label_id)).to match_array([skill3.label.id, industry3.label.id, country2.label.id])
          response
          expect(specialist.subscriptions.count).to eq(5)
          expect(specialist.subscriptions.pluck(:label_id)).to match_array([skill1.label.id, skill2.label.id, industry1.label.id, industry2.label.id, country.label.id])
        end
      end
    end

    context "when labels do not exist" do
      context "when new account" do
        it "does nothing" do
          expect(specialist.subscriptions.count).to eq(0)
          response
          expect(specialist.subscriptions.count).to eq(0)
        end
      end

      context "when adding stuff" do
        it "keeps existing subscriptions in place" do
          specialist.update!(skills: [skill1], industries: [industry1])
          skill1.create_label!
          industry1.create_label!
          specialist.subscribe_to!(skill1.label)
          specialist.subscribe_to!(industry1.label)
          expect(specialist.subscriptions.count).to eq(2)
          response
          expect(specialist.subscriptions.count).to eq(2)
          expect(specialist.subscriptions.pluck(:label_id)).to match_array([skill1.label.id, industry1.label.id])
        end
      end

      context "when removing stuff" do
        it "unsubscribes specialist from skill, industry, and country labels" do
          specialist.update!(skills: [skill3], industries: [industry3], country: country2)
          skill3.create_label!
          industry3.create_label!
          country2.create_label!
          specialist.subscribe_to!(skill3.label)
          specialist.subscribe_to!(industry3.label)
          specialist.subscribe_to!(country2.label)
          expect(specialist.subscriptions.count).to eq(3)
          expect(specialist.subscriptions.pluck(:label_id)).to match_array([skill3.label.id, industry3.label.id, country2.label.id])
          response
          expect(specialist.subscriptions.count).to eq(0)
        end
      end
    end
  end
end
