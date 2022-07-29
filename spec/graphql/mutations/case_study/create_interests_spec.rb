# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::CreateInterests do
  let(:user) { create(:user) }
  let(:context) { {current_user: user, current_account: user.account} }
  let(:terms) { ["A Term"] }
  let(:embedding1) { create(:case_study_embedding) }
  let(:embedding2) { create(:case_study_embedding) }
  let!(:article1) { embedding1.article }
  let!(:article2) { embedding2.article }
  let(:query) do
    <<-GRAPHQL
      mutation {
        createCaseStudyInterests(input: {
          terms: #{terms}
        }) {
          interests {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:request) { AdvisableSchema.execute(query, context:) }

  before { allow_any_instance_of(OpenAiInteractor).to receive(:query_embedding_for).and_return([-0.024432803, 0.02814213, 0.02230821]) }

  it "creates a new interest and enques populate interest articles job" do
    uid = request.dig("data", "createCaseStudyInterests", "interests").first["id"]
    interest = ::CaseStudy::Interest.with_log_data.find_by!(uid:)
    expect(interest.term).to eq("A Term")
    expect(interest.account).to eq(user.account)
    expect(interest.log_data.responsible_id).to eq(user.account_id)
    expect(interest.interest_articles).to be_blank
    interest.find_articles!
    expect(interest.articles).to match_array([article1, article2])
    expect(interest.treshold.round(2)).to eq(0.61)
    interest.interest_articles.reload
    expect(interest.interest_articles.pluck(:article_id)).to match_array([article1.id, article2.id])
    expect(interest.interest_articles.first.similarity.round(2)).to eq(0.61)
    expect(PopulateInterestArticlesJob).to have_been_enqueued.with([interest.id])
  end

  context "when embedding data is under treshold" do
    let(:embedding2) { create(:case_study_embedding, data: [500, -800, 300]) }

    context "when fewer than MIN_RESULTS are found" do
      it "still includes the article" do
        uid = request.dig("data", "createCaseStudyInterests", "interests").first["id"]
        interest = ::CaseStudy::Interest.with_log_data.find_by!(uid:)
        expect(interest.interest_articles).to be_blank
        interest.find_articles!
        expect(interest.articles).to include(article2)
      end
    end

    context "when more than MIN_RESULTS are found" do
      before { CaseStudy::TermData::MIN_RESULTS.times { create(:case_study_embedding) } }

      it "does not include the article" do
        uid = request.dig("data", "createCaseStudyInterests", "interests").first["id"]
        interest = ::CaseStudy::Interest.with_log_data.find_by!(uid:)
        expect(interest.interest_articles).to be_blank
        interest.find_articles!
        expect(interest.articles).not_to include(article2)
      end
    end
  end

  context "when multiple interests" do
    let(:terms) { ["A Term", "Another Term", "a term"] }

    it "creates unique interests" do
      uids = request.dig("data", "createCaseStudyInterests", "interests").map { |i| i["id"] }
      expect(uids.size).to eq(2)
      interests = ::CaseStudy::Interest.with_log_data.where(uid: uids)
      expect(interests.map(&:term)).to match_array(["A Term", "Another Term"])
      expect(interests.map(&:account_id).uniq).to eq([user.account_id])
      expect(interests.map { |i| i.log_data.responsible_id }.uniq).to eq([user.account_id])
      expect(PopulateInterestArticlesJob).to have_been_enqueued.with(match_array(interests.map(&:id)))
    end
  end

  context "when interests exist already" do
    let(:terms) { ["A Term", "Another Term", "a term"] }

    before do
      create(:case_study_interest, term: "a tErm", account: user.account)
      create(:case_study_interest, term: "Another Term") # different account
    end

    it "creates unique interests" do
      uids = request.dig("data", "createCaseStudyInterests", "interests").map { |i| i["id"] }
      expect(uids.size).to eq(1)
      interests = ::CaseStudy::Interest.with_log_data.where(account_id: user.account_id)
      expect(interests.map(&:term)).to match_array(["a tErm", "Another Term"])
      expect(interests.map(&:account_id).uniq).to eq([user.account_id])
      expect(interests.map { |i| i.log_data.responsible_id }.uniq).to eq([nil, user.account_id])
    end
  end

  context "when current_user is specialist" do
    let(:user) { create(:specialist) }

    it "returns an error" do
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end
end
