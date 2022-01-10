# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateUser do
  let(:marketing) { create(:industry, name: "Marketing") }
  let(:company) { create(:company, kind: "Major Corporation", industry: marketing) }
  let(:user) { create(:user, company:) }

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it "can update the industry" do
    advertising = create(:industry, name: "Advertising")
    AdvisableSchema.execute(
      query("{ industry: \"Advertising\" }"),
      context: {current_user: user}
    )
    expect(company.reload.industry).to eq(advertising)
  end

  it "can update the company_type" do
    expect do
      AdvisableSchema.execute(
        query("{ companyType: \"Startup\" }"),
        context: {current_user: user}
      )
    end.to change { user.company.reload.kind }.to("Startup")
  end

  context "when not logged in" do
    it "returns an error" do
      response =
        AdvisableSchema.execute(
          query("{ companyType: \"Startup\" }"),
          context: {current_user: nil}
        )
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end

  def query(input)
    <<-GRAPHQL
    mutation {
      updateUser(input: #{input}) {
        user {
          id
        }
      }
    }
    GRAPHQL
  end
end
