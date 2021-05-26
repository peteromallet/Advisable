# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CreateFreelancerAccount do
  let(:project) { create(:project) }
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
        pid: "#{project.try(:airtable_id)}",
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
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    project = instance_double(Airtable::Project)
    allow(project).to receive(:sync)
    allow(Airtable::Project).to receive(:find).and_return(project)
  end

  def response
    AdvisableSchema.execute(
      query,
      context: {
        session_manager: session_manager,
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
    specialist = Specialist.find_by(uid: uid)
    account = specialist.account
    expect(account.first_name).to eq("Test")
    expect(account.last_name).to eq("Account")
    expect(account.email).to eq(email)
  end

  it "creates an application invitation if a PID is provided" do
    data = response["data"]
    uid = data.dig("createFreelancerAccount", "viewer", "id")
    specialist = Specialist.find_by(uid: uid)
    expect(specialist.applications.first.project).to eq(project)
  end

  it "sends the confirmation email" do
    expect_any_instance_of(Specialist).to receive(:send_confirmation_email)
    response
  end

  it "schedules geocode job" do
    uid = response.dig("data", "createFreelancerAccount", "viewer", "id")
    expect(GeocodeAccountJob).to have_been_enqueued.with(Specialist.find_by(uid: uid).account, "1.2.3.4")
  end

  context "when no pid is provided" do
    let(:project) { nil }

    it "doesn't create any application record" do
      data = response["data"]
      uid = data.dig("createFreelancerAccount", "viewer", "id")
      specialist = Specialist.find_by(uid: uid)
      expect(specialist.applications).to be_empty
    end
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
      specialist = Specialist.find_by(uid: uid)
      expect(specialist.referrer_id).to eq(referrer.id)
      expect(specialist.referrer).to eq(referrer)
      expect(referrer.referred).to eq([specialist])
    end

    context "when passed airtable id" do
      let(:referrer_id) { referrer.airtable_id }

      it "tells sentry about it" do
        allow(Sentry).to receive(:capture_message)
        expect(Sentry).to receive(:capture_message).with("We're still getting airtable ids in referrers :unamused:", level: "debug")
        response
      end
    end
  end
end
