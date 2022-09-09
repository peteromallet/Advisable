# frozen_string_literal: true

require "rails_helper"

RSpec.describe "QueryType search field", type: :feature do
  let(:user) { create(:user) }
  let(:context) { {current_user: user, current_account: user.account} }
  let(:term) { "A Term" }
  let(:embedding1) { create(:case_study_embedding) }
  let(:embedding2) { create(:case_study_embedding) }
  let!(:article1) { embedding1.article }
  let!(:article2) { embedding2.article }
  let(:query) do
    <<-GRAPHQL
      query Search($term: String!) {
        search(term: $term) {
          id
          articles {
            nodes {
              id
            }
          }
        }
      }
    GRAPHQL
  end

  let(:request) { AdvisableSchema.execute(query, context:, variables: {term:}) }

  before { allow_any_instance_of(OpenAiInteractor).to receive(:query_embedding_for).and_return([-0.024432803, 0.02814213, 0.02230821]) }

  it "creates a new interest preview" do
    uid = request.dig("data", "search", "id")
    interest = ::CaseStudy::InterestPreview.find_by!(uid:)
    expect(interest.term).to eq("A Term")
    expect(interest.account).to eq(user.account)
    expect(interest.results).to match_array([article1.id, article2.id])
  end

  context "when embedding data is under treshold" do
    let(:embedding2) { create(:case_study_embedding, data: [500, -800, 300]) }

    context "when fewer than MIN_RESULTS are found" do
      it "still includes the article" do
        uid = request.dig("data", "search", "id")
        interest = ::CaseStudy::InterestPreview.find_by!(uid:)
        expect(interest.term).to eq("A Term")
        expect(interest.account).to eq(user.account)
        expect(interest.results).to include(article2.id)
      end
    end

    context "when more than MIN_RESULTS are found" do
      before { CaseStudy::TermData::MIN_RESULTS.times { create(:case_study_embedding) } }

      it "does not include the article" do
        uid = request.dig("data", "search", "id")
        interest = ::CaseStudy::InterestPreview.find_by!(uid:)
        expect(interest.term).to eq("A Term")
        expect(interest.account).to eq(user.account)
        expect(interest.results).not_to include(article2.id)
      end
    end
  end

  context "when a preview already exists" do
    before do
      ::CaseStudy::InterestPreview.create!(term:, account: user.account, results: [article1.id])
    end

    it "refreshes results unique interests" do
      uid = request.dig("data", "search", "id")
      interest = ::CaseStudy::InterestPreview.find_by!(uid:)
      expect(interest.term).to eq("A Term")
      expect(interest.account).to eq(user.account)
      expect(interest.results).to match_array([article1.id, article2.id])
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
