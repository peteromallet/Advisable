# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::UpdateSearch do
  let(:user) { search.user }
  let(:context) { {current_user: user} }
  let(:primary_skill) { create(:skill, name: "Primary") }
  let(:skill) { create(:skill, name: "Another") }
  let(:search) { create(:case_study_search) }
  let(:args) do
    <<-GRAPHQL
      businessType: "B2B",
      goals: ["First", "Second"],
      name: "A Search",
    GRAPHQL
  end
  let(:query) do
    <<-GRAPHQL
      mutation {
        updateCaseStudySearch(input: {
          id: "#{search.uid}",
          #{args}
        }) {
          search {
            id
          }
        }
      }
    GRAPHQL
  end

  it "updates a search" do
    response = AdvisableSchema.execute(query, context: context)
    uid = response["data"]["updateCaseStudySearch"]["search"]["id"]
    search = ::CaseStudy::Search.find_by!(uid: uid)
    expect(search.attributes.values_at("business_type", "goals", "name", "user_id")).to match_array(["B2B", %w[First Second], "A Search", user.id])
  end

  context "when skills passed in" do
    let(:args) do
      <<-GRAPHQL
        primarySkill: "#{primary_skill.name}",
        skills: ["#{skill.name}", "#{primary_skill.name}"],
      GRAPHQL
    end

    it "creates the skills" do
      response = AdvisableSchema.execute(query, context: context)
      uid = response["data"]["updateCaseStudySearch"]["search"]["id"]
      search = ::CaseStudy::Search.find_by!(uid: uid)
      expect(search.skills.count).to eq(2)
      expect(search.skills.primary.count).to eq(1)
      expect(search.skills.primary.first.skill.name).to eq("Primary")
    end

    context "when skills already exist" do
      it "updates the skills" do
        ::CaseStudy::Skill.create!(search: search, primary: true, skill: skill)
        ::CaseStudy::Skill.create!(search: search, primary: false, skill: create(:skill, name: "Third"))
        response = AdvisableSchema.execute(query, context: context)
        uid = response["data"]["updateCaseStudySearch"]["search"]["id"]
        search = ::CaseStudy::Search.find_by!(uid: uid)
        expect(search.skills.count).to eq(2)
        expect(search.skills.primary.count).to eq(1)
        expect(search.skills.primary.first.skill.name).to eq("Primary")
      end
    end
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
