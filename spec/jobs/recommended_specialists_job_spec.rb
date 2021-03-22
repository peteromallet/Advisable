# frozen_string_literal: true

require "rails_helper"

RSpec.describe RecommendedSpecialistsJob do
  subject(:enqueued_job) do
    described_class.perform_now(specialist.id)
  end

  let(:specialist) { create(:specialist, :guild) }
  let(:same_skill) { create(:skill, name: 'Marketing') }
  let(:diff_skill) { create(:skill, name: 'Facebook Ads') }
  let(:same_industry) { create(:industry, name: 'Education') }
  let(:diff_industry) { create(:industry, name: 'Aerospace') }

  context "when matched by skill" do
    before do
      specialist.update!(skills: [same_skill])
    end

    it "suggests a connection" do
      stub_const("RecommendedSpecialist::MATCH_CATEGORIES", ["skill"])
      match = create(:specialist, :guild, skills: [same_skill])

      expect do
        enqueued_job
      end.to change(RecommendedSpecialist, :count).from(0).to(1)
      expect(RecommendedSpecialist.first.recommendation).to eq(match)
    end

    it "chooses another category if there are no skill matches" do
      stub_const("RecommendedSpecialist::MATCH_CATEGORIES", %w[skill random])
      create(:specialist, :guild, skills: [])
      no_skills_match = create(:specialist, :guild, skills: [diff_skill])

      expect do
        enqueued_job
      end.to change(RecommendedSpecialist, :count).from(0).to(1)

      recommended = RecommendedSpecialist.first
      expect(recommended.match_category).to eq("random")
      expect(recommended.recommendation).not_to eq(no_skills_match)
    end

    it "does not suggest a previous recommendation" do
      stub_const("RecommendedSpecialist::MATCH_CATEGORIES", %w[skill])
      match = create(:specialist, :guild, skills: [same_skill])
      create(:recommended_specialist, specialist: specialist, recommendation: match)

      expect do
        enqueued_job
      end.not_to change(RecommendedSpecialist, :count)
    end

    it "recommends a specialist with the most skills in common"
    it "does not recommend a specialist with < 2 skills in common"
    it "does not include > 3 matched skill names"
    it "does not include matched skill names that are not in common"
  end

  context "when matched by industry" do
    before do
      same_industry.previous_projects.create!(specialist: specialist)
    end

    it "suggests a connection" do
      stub_const("RecommendedSpecialist::MATCH_CATEGORIES", ["industry"])
      match = create(:specialist, :guild)
      same_industry.previous_projects.create!(specialist: match)

      expect do
        enqueued_job
      end.to change(RecommendedSpecialist, :count).from(0).to(1)
      expect(RecommendedSpecialist.first.recommendation).to eq(match)
    end

    it "chooses another category if there are no industry matches" do
      stub_const("RecommendedSpecialist::MATCH_CATEGORIES", %w[industry skill])
      no_match = create(:specialist, :guild)
      diff_industry.previous_projects.create!(specialist: no_match)

      specialist.update!(skills: [same_skill])
      create(:specialist, :guild, skills: [same_skill])

      expect do
        enqueued_job
      end.to change(RecommendedSpecialist, :count).from(0).to(1)

      recommended = RecommendedSpecialist.first
      expect(recommended.match_category).to eq("skill")
      expect(recommended.recommendation).not_to eq(no_match)
    end

    it "does not suggest a previous recommendation" do
      stub_const("RecommendedSpecialist::MATCH_CATEGORIES", %w[industry])
      match = create(:specialist, :guild)
      same_industry.previous_projects.create!(specialist: match)
      create(:recommended_specialist, specialist: specialist, recommendation: match)

      expect do
        enqueued_job
      end.not_to change(RecommendedSpecialist, :count)
    end

    it "recommends a specialist with the most industries in common"
    it "does not include > 3 matched industry names"
  end

  context "when randomly matched with no skill or industry criteria" do
    it "creates a recommendation" do
      stub_const("RecommendedSpecialist::MATCH_CATEGORIES", %w[random])
      matches = create_list(:specialist, 2, :guild)

      expect do
        enqueued_job
      end.to change(RecommendedSpecialist, :count).from(0).to(1)
      expect(RecommendedSpecialist.first.match_category).to eq("random")
      expect(matches).to include(RecommendedSpecialist.first.recommendation)
    end
  end
end
