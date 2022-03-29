# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CreateFreelancerAccount do
  let(:email) { "test@test.com" }
  let(:referrer_id) { "referrer" }
  let(:session_manager) { SessionManager.new(session: OpenStruct.new, cookies: OpenStruct.new) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createFreelancerAccount(input: {
        firstName: "Test",
        lastName: "Account",
        email: "#{email}",
        campaignName: "campaignName",
        campaignSource: "campaignSource",
        referrer: "#{referrer_id}"
      }) {
        viewer {
          ... on Specialist {
            id
          }
        }
      }
    }
    GRAPHQL
  end

  before do
    allow(session_manager).to receive(:login)
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  def response
    AdvisableSchema.execute(
      query,
      context: {
        session_manager:,
        client_ip: "1.2.3.4"
      }
    )
  end

  it "creates a new specialist" do
    expect { response }.to change(Specialist, :count).by(1)
  end

  it "sets first name, last name, and email" do
    data = response["data"]
    uid = data.dig("createFreelancerAccount", "viewer", "id")
    specialist = Specialist.find_by(uid:)
    account = specialist.account
    expect(account.first_name).to eq("Test")
    expect(account.last_name).to eq("Account")
    expect(account.email).to eq(email)
  end

  it "sends the confirmation email" do
    expect_any_instance_of(Specialist).to receive(:send_confirmation_email)
    response
  end

  it "schedules geocode job" do
    uid = response.dig("data", "createFreelancerAccount", "viewer", "id")
    expect(GeocodeAccountJob).to have_been_enqueued.with(Specialist.find_by(uid:).account, "1.2.3.4")
  end

  context "when given an email that is already been used" do
    let(:user) { create(:user) }
    let(:email) { user.account.email.upcase }

    it "returns an error" do
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("EMAIL_TAKEN")
    end
  end

  describe "referrer parsing" do
    let(:referrer) { create(:specialist) }
    let(:referrer_id) { referrer.uid }

    it "sets the referrer relation" do
      data = response["data"]
      uid = data.dig("createFreelancerAccount", "viewer", "id")
      specialist = Specialist.find_by(uid:)
      expect(specialist.referrer_id).to eq(referrer.id)
      expect(specialist.referrer).to eq(referrer)
      expect(referrer.referred).to eq([specialist])
    end
  end
end
