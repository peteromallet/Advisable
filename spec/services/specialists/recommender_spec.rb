# frozen_string_literal: true

require "rails_helper"

RSpec.describe Specialists::Recommender do
  subject(:recommender) do
    described_class.call(specialist: specialist)
  end

  let(:specialist) { create(:specialist, :guild) }
  let(:same_industry) { create(:industry, name: 'Education') }
  let(:diff_industry) { create(:industry, name: 'Aerospace') }

  context "with skills" do
    let(:same_skills) do
      create_list(:skill, 2) do |skill, i|
        skill.name = "name_#{i}"
      end
    end

    let(:match) { create(:specialist, :guild) }

    before do
      stub_const("Specialists::Recommender::CATEGORIES", ["skill"])
      specialist.update!(skills: same_skills)
    end

    it "makes a recommendation when there's > 1 skill in common" do
      specialist.update!(skills: same_skills)
      match.update!(skills: same_skills)
      expect(recommender.recommendation).to eq(match)
      expect(recommender.category).to eq("skill")
      expect(recommender.recommendation_tokens).to eq(%w[name_0 name_1])
    end

    it "makes a recommendation when there's > 1 project_skill in common" do
      skills = create_list(:skill, 2)
      create(:previous_project, specialist: match, skills: skills)
      create(:previous_project, specialist: specialist, skills: skills)
      expect(recommender.recommendation).to eq(match)
    end

    it "makes a recommendation when there's > 1 project_skill OR skill total in common" do
      same_skill, project_skill = same_skills
      same_skill.update!(name: "regular_skill")
      project_skill.update!(name: "project_skill")

      match.update!(skills: [same_skill])
      create(:previous_project, specialist: match, skills: [project_skill])

      expect(recommender.recommendation).to eq(match)
      expect(recommender.recommendation_tokens).to eq(%w[regular_skill project_skill])
    end

    it "chooses another category if there are no skill matches" do
      stub_const("Specialists::Recommender::CATEGORIES", %w[skill random])
      random_match = create(:specialist, :guild, skills: [create(:skill)])

      expect(recommender.recommendation).to eq(random_match)
      expect(recommender.category).to eq("random")
    end

    it "raises an error if there are no recommendations" do
      stub_const("Specialists::Recommender::CATEGORIES", %w[skill industry])
      # no match
      create(:specialist, :guild, skills: [])

      expect do
        recommender
      end.to raise_error(Service::Error).with_message(/Could not recommend a specialist/)
    end
  end

  context "with industries" do
    before do
      same_industry.previous_projects.create!(specialist: specialist)
    end

    it "makes a recommendation if there are > 0 industries in common" do
      stub_const("Specialists::Recommender::CATEGORIES", ["industry"])
      match = create(:specialist, :guild)
      same_industry.previous_projects.create!(specialist: match)

      expect(recommender.recommendation).to eq(match)
      expect(recommender.category).to eq("industry")
      expect(recommender.recommendation_tokens).to eq([same_industry.name])
    end

    it "chooses another category if there are no industry matches" do
      stub_const("Specialists::Recommender::CATEGORIES", %w[industry random])
      # No industry matches
      no_match = create(:specialist, :guild)
      diff_industry.previous_projects.create!(specialist: no_match)

      expect(recommender.category).to eq("random")
      expect(recommender.recommendation_tokens).to eq(nil)
    end
  end

  context "when randomly matched with no skill or industry criteria" do
    it "creates a recommendation" do
      stub_const("Specialists::Recommender::CATEGORIES", %w[random])
      others = create_list(:specialist, 2, :guild)

      expect(others).to include(recommender.recommendation)
      expect(recommender.category).to eq("random")
      expect(recommender.recommendation_tokens).to eq(nil)
    end
  end
end
