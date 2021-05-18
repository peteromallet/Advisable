# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CaseStudy::Search, type: :model do
  it "has a valid factory" do
    expect(build(:case_study_search)).to be_valid
  end

  describe "#results" do
    let(:article1) { create(:case_study_article) }
    let(:article2) { create(:case_study_article) }
    let(:article3) { create(:case_study_article) }
    let(:article4) { create(:case_study_article) }
    let(:skill1) { create(:skill) }
    let(:skill2) { create(:skill) }
    let(:skill3) { create(:skill) }

    it "includes articles with all or some skills" do
      article1.skills.create(skill: skill1)
      article1.skills.create(skill: skill2)
      article2.skills.create(skill: skill1)
      article3.skills.create(skill: skill3)
      search = create(:case_study_search)
      search.skills.create(skill: skill1)
      search.skills.create(skill: skill2)
      results = search.results
      expect(results.pluck(:id)).to match_array([article1.id, article2.id])
    end

    it "includes articles with all or some goals" do
      article1.update(goals: %w[one two])
      article2.update(goals: %w[one three])
      article3.update(goals: %w[three])
      article4.update(goals: [])
      search = create(:case_study_search, goals: %w[one two])
      results = search.results
      expect(results.pluck(:id)).to match_array([article1.id, article2.id])
    end

    it "includes articles with same business type" do
      article1.update(company_type: "B2B")
      article2.update(company_type: "B2C")
      search = create(:case_study_search, business_type: "B2B")
      results = search.results
      expect(results.pluck(:id)).to match_array([article1.id])
    end

    it "works with all combined" do
      article1.skills.create(skill: skill1)
      article1.skills.create(skill: skill2)
      article2.skills.create(skill: skill1)
      article3.skills.create(skill: skill3)
      article1.update(goals: %w[one two], company_type: "B2B")
      article2.update(goals: %w[one three], company_type: "B2B")
      article3.update(goals: %w[three], company_type: "B2C")
      search = create(:case_study_search, business_type: "B2B", goals: %w[one two])
      search.skills.create(skill: skill1)
      search.skills.create(skill: skill2)
      results = search.results
      expect(results.pluck(:id)).to match_array([article1.id, article2.id])
    end
  end
end
