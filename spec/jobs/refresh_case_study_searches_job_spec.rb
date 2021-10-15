# frozen_string_literal: true

require "rails_helper"

RSpec.describe RefreshCaseStudySearchesJob do
  let!(:user) { create(:user, account: create(:account)) }
  let!(:user2) { create(:user, account: create(:account)) }
  let!(:user_without_access) { create(:user, application_status: "Submitted") }
  let(:search1) { create(:case_study_search, user: user) }
  let(:search2) { create(:case_study_search, user: user) }
  let(:search3) { create(:case_study_search, user: user2) }
  let(:search4) { create(:case_study_search, user: user_without_access) }
  let(:article1) { create(:case_study_article, score: 90) }
  let(:article2) { create(:case_study_article, score: 85) }
  let(:article3) { create(:case_study_article, score: 75) }
  let(:article4) { create(:case_study_article, score: 65) }
  let(:article5) { create(:case_study_article, score: 55) }
  let(:article6) { create(:case_study_article, score: 45) }
  let(:article7) { create(:case_study_article, score: 35) }
  let(:skill1) { create(:skill) }
  let(:skill2) { create(:skill) }
  let(:skill3) { create(:skill) }

  before do
    article1.skills.create(skill: skill1)
    article1.skills.create(skill: skill2)
    article2.skills.create(skill: skill2)
  end

  it "sends one email per user" do
    search1.skills.create(skill: skill1)
    search2.skills.create(skill: skill2)
    search3.skills.create(skill: skill2)
    expect(UserMailer).to receive(:case_study_searches_refreshed).twice
    described_class.perform_now
  end

  it "only sends to users with Application Accepted" do
    search1.skills.create(skill: skill1)
    search4.skills.create(skill: skill1)
    expect(UserMailer).to receive(:case_study_searches_refreshed).with(user, any_args)
    expect(UserMailer).not_to receive(:case_study_searches_refreshed).with(user_without_access, any_args)
    described_class.perform_now
  end

  it "sends only the updated searches" do
    search1.skills.create(skill: skill1)
    search1.skills.create(skill: skill2)
    search2.skills.create(skill: skill1)
    search2.update(results: [article1.id])
    expect(UserMailer).to receive(:case_study_searches_refreshed).with(user, {search1.id => [article1.id, article2.id]})
    described_class.perform_now
  end

  it "saves the updated results into search" do
    search1.skills.create(skill: skill1)
    search1.skills.create(skill: skill2)
    search2.skills.create(skill: skill1)
    search2.update(results: [article1.id])
    expect(search1.reload.attributes["results"]).to be_nil
    described_class.perform_now
    expect(search1.reload.attributes["results"]).to match_array([article1.id, article2.id])
  end

  it "doesn't save more than RESULT_LIMIT results" do
    search1.skills.create(skill: skill3)
    expect(search1.reload.results).to be_empty
    (CaseStudy::Search::RESULT_LIMIT + 2).times do
      article = create(:case_study_article)
      article.skills.create(skill: skill3)
    end
    described_class.perform_now
    expect(search1.reload.results.size).to eq(CaseStudy::Search::RESULT_LIMIT)
  end

  context "when existing results" do
    before do
      1.upto(7) do |i|
        public_send("article#{i}").skills.create(skill: skill3)
      end
      search1.skills.create(skill: skill3)
    end

    it "leaves existing ones in place even if low score should push them out" do
      search1.update(results: [article5.id, article6.id, article7.id], archived: [article5.id])
      described_class.perform_now
      results = search1.reload.attributes["results"]
      expect(results.size).to eq(CaseStudy::Search::RESULT_LIMIT + 1)
      expect(results).to include(article5.id, article6.id, article7.id)
      expect(search1.reload.results.size).to eq(CaseStudy::Search::RESULT_LIMIT)
    end
  end
end
