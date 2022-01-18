# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::CreateSearch do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:article1) { create(:case_study_article, :with_skills) }
  let(:article2) { create(:case_study_article, :with_skills) }
  let(:relevant_category) { create(:skill_category) }
  let(:category_slugs) { [relevant_category.slug] }

  let(:query) do
    <<-GRAPHQL
      mutation {
        createCaseStudySearch(input: {
          articles: ["#{article1.uid}", "#{article2.uid}"],
          businessType: "B2B",
          goals: ["First", "Second"],
          name: "A Search",
          preferences: ["One", "Two"],
          categories: #{category_slugs}
        }) {
          search {
            id
          }
        }
      }
    GRAPHQL
  end

  before do
    (article1.skills + article2.skills).each do |cs_skill|
      cs_skill.skill.skill_categories << relevant_category
    end
  end

  it "creates a new search" do
    request = AdvisableSchema.execute(query, context:)
    uid = request["data"]["createCaseStudySearch"]["search"]["id"]
    search = ::CaseStudy::Search.find_by!(uid:)
    expect(search.business_type).to eq("B2B")
    expect(search.goals).to match_array(%w[First Second])
    expect(search.name).to eq("A Search")
    expect(search.user_id).to eq(user.id)
    expect(search.skills.pluck(:skill_id)).to match_array([article1.skills.pluck(:skill_id), article2.skills.pluck(:skill_id)].flatten)
    expect(search.preferences).to eq(%w[One Two])
    expect(search.results).to match_array([article1, article2])
  end

  describe "skills outside the category" do
    let(:irrelevant_category) { create(:skill_category) }

    before do
      article1.skills[0].skill.skill_category_skills.first.update!(skill_category_id: irrelevant_category.id)
      article2.skills[1].skill.skill_category_skills.first.update!(skill_category_id: irrelevant_category.id)
    end

    it "only adds relevant skills" do
      request = AdvisableSchema.execute(query, context:)
      uid = request["data"]["createCaseStudySearch"]["search"]["id"]
      search = ::CaseStudy::Search.find_by!(uid:)
      expect(search.skills.size).to eq(2)
      expect(search.skills.pluck(:skill_id)).to match_array(relevant_category.skill_ids)
    end
  end

  context "when current_user is specialist" do
    let(:user) { create(:specialist) }

    it "returns an error" do
      request = AdvisableSchema.execute(query, context:)
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      request = AdvisableSchema.execute(query, context:)
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end
end
