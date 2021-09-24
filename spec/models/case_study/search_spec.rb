# frozen_string_literal: true

require 'rails_helper'

# TODO: Maybe refactor this to factories so we're not creating so many things all the time
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

    it "does not include archived" do
      article1.skills.create(skill: skill1)
      article2.skills.create(skill: skill1)
      search = create(:case_study_search, archived: [article1.id])
      search.skills.create(skill: skill1)
      results = search.results
      expect(results.pluck(:id)).to match_array([article2.id])
    end

    it "stores the results and allows refreshing" do
      article1.update(goals: %w[one two])
      article2.update(goals: %w[three])
      search = create(
        :case_study_search,
        goals: %w[one],
        results: [article1.id, article2.id, article3.id, article4.id],
        archived: [article4.id]
      )
      expect(search.results.pluck(:id)).to match_array([article1.id, article2.id, article3.id])
      search.update(results: nil)
      expect(search.results.pluck(:id)).to match_array([article1.id])
    end

    it "works with all combined" do
      article1.skills.create(skill: skill1)
      article1.skills.create(skill: skill2)
      article2.skills.create(skill: skill1)
      article3.skills.create(skill: skill3)
      article4.skills.create(skill: skill1)
      article1.update(goals: %w[one two], company_type: "B2B")
      article2.update(goals: %w[one three], company_type: "B2B")
      article3.update(goals: %w[three], company_type: "B2C")
      article4.update(goals: %w[two], company_type: "B2B")
      search = create(:case_study_search, business_type: "B2B", goals: %w[one two], archived: [article4.id])
      search.skills.create(skill: skill1)
      search.skills.create(skill: skill2)
      results = search.results
      expect(results.pluck(:id)).to match_array([article1.id, article2.id])
      expect(search.attributes["results"]).to match_array([article1.id, article2.id])
    end

    context "when article is not published yet" do
      let(:article2) { create(:case_study_article, published_at: nil) }

      it "excludes that article" do
        article1.skills.create(skill: skill1)
        article2.skills.create(skill: skill1)
        search = create(:case_study_search)
        search.skills.create(skill: skill1)
        results = search.results
        expect(results.pluck(:id)).to match_array([article1.id])
      end
    end

    context "when article is soft_deleted" do
      let(:article2) { create(:case_study_article, deleted_at: Time.current) }

      it "excludes that article" do
        article1.skills.create(skill: skill1)
        article2.skills.create(skill: skill1)
        search = create(:case_study_search)
        search.skills.create(skill: skill1)
        results = search.results
        expect(results.pluck(:id)).to match_array([article1.id])
      end
    end

    context "when specialist is not available" do
      let(:unavailable) { create(:specialist, unavailable_until: Date.tomorrow) }
      let(:unavailable_yesterday) { create(:specialist, unavailable_until: Date.yesterday) }
      let(:article2) { create(:case_study_article, specialist: unavailable) }
      let(:article3) { create(:case_study_article, specialist: unavailable_yesterday) }

      it "excludes that article" do
        article1.skills.create(skill: skill1)
        article2.skills.create(skill: skill1)
        article3.skills.create(skill: skill1)
        search = create(:case_study_search)
        search.skills.create(skill: skill1)
        results = search.results
        expect(results.pluck(:id)).to match_array([article1.id, article3.id])
      end
    end

    context "when skills given" do
      it "does not filter by goals" do
        article1.skills.create(skill: skill1)
        article1.skills.create(skill: skill2)
        article2.skills.create(skill: skill1)
        article1.update(goals: %w[one two])
        article2.update(goals: %w[three])
        search = create(:case_study_search, goals: %w[one two])
        search.skills.create(skill: skill1)
        search.skills.create(skill: skill2)
        results = search.results
        expect(results.pluck(:id)).to match_array([article1.id, article2.id])
        expect(search.attributes["results"]).to match_array([article1.id, article2.id])
      end
    end
  end

  describe "#archived" do
    it "returns an array on nil" do
      search =  create(:case_study_search, archived: nil)
      expect(search.archived).to eq([])
    end

    it "uniques ids on save" do
      search =  create(:case_study_search)
      search.archived = [123, 123, 1234]
      expect(search.archived).to eq([123, 123, 1234])
      search.save!
      expect(search.archived).to eq([123, 1234])
    end
  end
end
