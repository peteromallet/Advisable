# frozen_string_literal: true

require "rails_helper"

RSpec.describe Recommendation do
  subject(:recommender) do
    described_class.recommend(specialist)
  end

  let(:specialist) { create(:specialist, :guild) }

  context "with skills" do
    let(:same_skills) do
      create_list(:skill, 2) do |skill, i|
        skill.name = "name_#{i}"
      end
    end

    let(:match) { create(:specialist, :guild) }

    before do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Skills])
      specialist.update!(skills: same_skills)
    end

    it "makes a recommendation when there's > 1 skill in common" do
      specialist.update!(skills: same_skills)
      match.update!(skills: same_skills)
      expect(recommender.recommendation).to eq(match)
      expect(recommender.skills).to eq(same_skills)
    end

    it "makes a recommendation when there's > 1 project_skill in common" do
      skills = create_list(:skill, 2)
      create(:previous_project, specialist: match, skills: skills)
      create(:previous_project, specialist: specialist, skills: skills)
      expect(recommender.recommendation).to eq(match)
      expect(recommender.skills).to eq(skills)
    end

    it "makes a recommendation when there's > 1 project_skill OR skill total in common" do
      same_skill, project_skill = same_skills
      same_skill.update!(name: "regular_skill")
      project_skill.update!(name: "project_skill")

      match.update!(skills: [same_skill])
      create(:previous_project, specialist: match, skills: [project_skill])

      expect(recommender.recommendation).to eq(match)
      expect(recommender.skills).to eq([same_skill, project_skill])
    end

    it "does not have a recommendation" do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Skills])
      # no match
      create(:specialist, :guild, skills: [])
      expect(recommender.recommendation).to eq(nil)
    end
  end

  context "with industries" do
    let(:same_industry) { create(:industry, name: 'Education') }
    let(:diff_industry) { create(:industry, name: 'Aerospace') }
    let(:match) { create(:specialist, :guild) }

    before do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Industry])
      same_industry.previous_projects.create!(specialist: specialist)
    end

    it "makes a recommendation if there are > 0 industries in common" do
      same_industry.previous_projects.create!(specialist: match)

      expect(recommender.recommendation).to eq(match)
      expect(recommender.industries).to eq([same_industry])
    end

    it "only includes industries that are in common" do
      project = same_industry.previous_projects.create!(specialist: match)
      project.industries << diff_industry

      expect(recommender.recommendation).to eq(match)
      expect(recommender.industries).to eq([same_industry])
    end
  end

  context "with random" do
    let(:other) { create(:specialist, :guild) }

    before do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Random])
    end

    it "creates a recommendation" do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Random])
      other = create(:specialist, :guild)

      expect(other).to eq(recommender.recommendation)
      expect(recommender).not_to respond_to(:industries)
      expect(recommender.skills).to eq(nil)
    end

    it "includes the three most popular project skills ordered by count" do
      skills = create_list(:skill, 6)

      prev_projects = create_list(:previous_project, 6, specialist: other, skills: skills)
      top_skill = skills.first
      prev_projects.first.skills << top_skill

      expect(recommender.skills.first).to eq(top_skill)
      expect(recommender.skills.length).to eq(3)
    end
  end
end
