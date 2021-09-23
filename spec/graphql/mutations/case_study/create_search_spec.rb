# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::CreateSearch do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:article1) { create(:case_study_article, :with_skills) }
  let(:article2) { create(:case_study_article, :with_skills) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        createCaseStudySearch(input: {
          articles: ["#{article1.id}", "#{article2.id}"],
          businessType: "B2B",
          goals: ["First", "Second"],
          name: "A Search",
          preferences: ["One", "Two"],
        }) {
          search {
            id
          }
        }
      }
    GRAPHQL
  end

  it "creates a new search" do
    response = AdvisableSchema.execute(query, context: context)
    uid = response["data"]["createCaseStudySearch"]["search"]["id"]
    search = ::CaseStudy::Search.find_by!(uid: uid)
    expect(search.attributes.values_at("business_type", "goals", "name", "user_id")).to match_array(["B2B", %w[First Second], "A Search", user.id])
    expect(search.skills.pluck(:skill_id)).to match_array([article1.skills.pluck(:skill_id), article2.skills.pluck(:skill_id)].flatten)
    expect(search.preferences).to eq(%w[One Two])
    expect(search.results).to match_array([article1, article2])
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
