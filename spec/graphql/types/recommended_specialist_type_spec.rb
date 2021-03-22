# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::RecommendedSpecialistType do
  subject(:response) do
    AdvisableSchema.execute(query, context: {current_user: current_user})
  end

  let(:skills) { create_list(:skill, 2) }
  let(:query) do
    <<-GRAPHQL
        {
          recommendedSpecialist {
            recommendation {
              id
            }
            recommendationTokens
            category
          }

        }
    GRAPHQL
  end
  let(:other) { create(:specialist, :guild) }
  let(:current_user) { create(:specialist, :guild, skills: skills) }

  it "returns a recommendation" do
    stub_const("Specialists::Recommender::CATEGORIES", %w[skill])
    other.update!(skills: skills)

    expect(response["data"]["recommendedSpecialist"]).to eq({
      "recommendation" => {"id" => other.uid},
      "recommendationTokens" => skills.pluck(:name),
      "category" => "skill"
    })
  end

  it "returns an error if there is no possible recommendation" do
    other.delete
    expect(response["errors"][0]["message"]).to match(/Could not recommend a specialist/)
  end
end
