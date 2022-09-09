# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::DeleteInterest do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:interest) { create(:case_study_interest, account: user.account) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        deleteCaseStudyInterest(input: {
          id: "#{interest.uid}"
        }) {
          success
        }
      }
    GRAPHQL
  end

  it "deletes a interest" do
    uid = interest.uid
    response = AdvisableSchema.execute(query, context:)
    success = response["data"]["deleteCaseStudyInterest"]["success"]
    expect(success).to be(true)
    expect(::CaseStudy::Interest.find_by(uid:)).to be_nil
  end

  context "when current_user is not owner" do
    let(:interest) { create(:case_study_interest) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end
end
