# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::CreateSearch do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:primary_skill) { create(:skill, name: "Primary") }
  let(:skill) { create(:skill, name: "Another") }

  let(:query) do
    <<-GRAPHQL
      mutation {
        createCaseStudySearch(input: {
          businessType: "B2B",
          goals: ["First", "Second"],
          name: "A Search",
          primarySkill: "#{primary_skill.name}",
          skills: ["#{skill.name}", "#{primary_skill.name}"],
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
    expect(search.skills.count).to eq(2)
    expect(search.skills.primary.count).to eq(1)
    expect(search.skills.primary.first.skill.name).to eq("Primary")
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
