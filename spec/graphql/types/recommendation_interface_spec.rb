# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::RecommendationInterface do
  subject(:response) do
    AdvisableSchema.execute(query, context: {current_user: current_user})
  end

  let(:query) do
    <<-GRAPHQL
        {
          specialistRecommendation {
            recommendation {
              id
            }
            ... on SkillsRecommendation {
              skills {
                id
                name
              }
            }
            ... on IndustryRecommendation {
              industries {
                id
                name
              }
            }
          }
        }
    GRAPHQL
  end

  let(:skills) { create_list(:skill, 2) }
  let(:current_user) { create(:specialist, :guild, skills: skills) }

  it "returns a skills recommendation" do
    stub_const("Recommendation::RECOMMENDERS", [Recommendation::Skills])
    match = create(:specialist, :guild, skills: skills)

    expect(response["data"]["specialistRecommendation"]).to eq({
      "recommendation" => {"id" => match.uid},
      "skills" => skills.map { |s| {"id" => s.uid, "name" => s.name} }
    })
  end

  it "returns an industry recommendation" do
    stub_const("Recommendation::RECOMMENDERS", [Recommendation::Industry])
    match = create(:specialist, :guild)
    same_industry = create(:industry, name: 'Education')
    same_industry.previous_projects.create!(specialist: current_user)
    same_industry.previous_projects.create!(specialist: match)

    expect(response["data"]["specialistRecommendation"]).to eq({
      "recommendation" => {"id" => match.uid},
      "industries" => [{"id" => same_industry.uid, "name" => same_industry.name}]
    })
  end

  it "returns a random recommendation" do
    stub_const("Recommendation::RECOMMENDERS", [Recommendation::Random])
    random_match = create(:specialist, :guild)

    expect(response["data"]["specialistRecommendation"]).to eq({
      "recommendation" => {"id" => random_match.uid}
    })
  end

  it "does not return a recommendation" do
    stub_const("Recommendation::RECOMMENDERS", [Recommendation::Skills])
    create(:specialist, :guild)

    expect(response["data"]["specialistRecommendation"]["recommendation"]).to eq(nil)
  end
end
