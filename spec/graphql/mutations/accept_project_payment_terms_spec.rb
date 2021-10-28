# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::AcceptProjectPaymentTerms do
  let(:company) { create(:company, accepted_project_payment_terms_at: nil) }
  let(:account) { create(:account, permissions: ["team_manager"]) }
  let(:user) { create(:user, company: company, account: account) }
  let(:current_user) { user }
  let(:query) do
    <<-GRAPHQL
      mutation {
        acceptProjectPaymentTerms(input: {
          exceptionalTerms: "exceptional terms"
        }) {
          user {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:context) { {current_user: current_user} }

  before do
    allow(company).to receive(:update_payments_setup).and_return(nil)
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it "sets accepted_project_payment_terms_at to the current time " do
    expect(company.accepted_project_payment_terms_at).to be_nil
    response = AdvisableSchema.execute(query, context: context)
    expect(company.reload.accepted_project_payment_terms_at).to be_within(
      2.seconds
    ).of(Time.zone.now)
  end

  it "sets the eceptionalTerms" do
    expect {
      AdvisableSchema.execute(query, context: context)
    }.to change(user, :exceptional_project_payment_terms).from(nil).to("exceptional terms")
  end

  it "calls update_payments_setup on company" do
    AdvisableSchema.execute(query, context: context)
    expect(company).to have_received(:update_payments_setup)
  end

  context "when the current user is not a manager" do
    let(:account) { create(:account, permissions: []) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_TEAM_MANAGER")
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end
end
