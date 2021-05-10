# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::DeleteSearch do
  let(:user) { search.user }
  let(:context) { {current_user: user} }
  let(:search) { create(:case_study_search) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        deleteCaseStudySearch(input: {
          id: "#{search.uid}"
        }) {
          success
        }
      }
    GRAPHQL
  end

  it "deletes a search" do
    uid = search.uid
    response = AdvisableSchema.execute(query, context: context)
    success = response["data"]["deleteCaseStudySearch"]["success"]
    expect(success).to eq(true)
    expect(::CaseStudy::Search.find_by(uid: uid)).to eq(nil)
  end

  context "when current_user is not owner" do
    let(:user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context "when current_user is specialist" do
    let(:user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end
end
