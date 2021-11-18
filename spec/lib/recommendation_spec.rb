# frozen_string_literal: true

require "rails_helper"

RSpec.describe Recommendation do
  subject(:recommender) do
    described_class.recommend(specialist)
  end

  let(:specialist) { create(:specialist) }

  context "with skills" do
    let(:same_skills) do
      create_list(:skill, 2) do |skill, i|
        skill.name = "name_#{i}"
      end
    end

    let(:match) { create(:specialist) }

    before do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Skills])
      specialist.update!(skills: same_skills)
    end

    it "does not make a recommendation if others are not accepted" do
      specialist.update!(skills: same_skills)
      match.update!(application_stage: "Completed", skills: same_skills)
      expect(recommender.recommendation).to eq(nil)
    end

    it "makes a recommendation when there's > 1 skill in common" do
      specialist.update!(skills: same_skills)
      match.update!(skills: same_skills)
      expect(recommender.recommendation).to eq(match)
      expect(recommender.skills).to eq(same_skills)
    end

    it "makes a recommendation when there's > 1 project_skill OR skill total in common" do
      same_skill, project_skill = same_skills
      same_skill.update!(name: "regular_skill")
      project_skill.update!(name: "project_skill")

      match.update!(skills: [same_skill])

      expect(recommender.recommendation).to eq(match)
      expect(recommender.skills).to eq([same_skill, project_skill])
    end

    it "does not have a recommendation" do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Skills])
      # no match
      create(:specialist, skills: [])
      expect(recommender.recommendation).to eq(nil)
    end
  end

  context "with random" do
    let(:other) { create(:specialist) }

    before do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Random])
    end

    it "creates a recommendation" do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Random])
      other = create(:specialist)

      expect(other).to eq(recommender.recommendation)
      expect(recommender).not_to respond_to(:industries)
      expect(recommender.skills).to eq(nil)
    end
  end
end
