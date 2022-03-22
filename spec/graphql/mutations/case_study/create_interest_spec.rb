# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::CreateInterest do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:embedding1) { create(:case_study_embedding) }
  let(:embedding2) { create(:case_study_embedding) }
  let!(:article1) { embedding1.article }
  let!(:article2) { embedding2.article }

  let(:query) do
    <<-GRAPHQL
      mutation {
        createCaseStudyInterest(input: {
          term: "A Term",
        }) {
          interest {
            id
          }
        }
      }
    GRAPHQL
  end

  before { allow_any_instance_of(OpenAiInteractor).to receive(:embedding_for).and_return([-0.024432803, 0.02814213, 0.02230821]) }

  it "creates a new interest" do
    request = AdvisableSchema.execute(query, context:)
    uid = request["data"]["createCaseStudyInterest"]["interest"]["id"]
    interest = ::CaseStudy::Interest.find_by!(uid:)
    expect(interest.term).to eq("A Term")
    expect(interest.account).to eq(user.account)
    expect(interest.articles).to match_array([article1, article2])
  end

  context "when current_user is specialist" do
    let(:user) { create(:specialist) }

    it "returns an error" do
      request = AdvisableSchema.execute(query, context:)
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      request = AdvisableSchema.execute(query, context:)
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when duck typed with search creation" do
    let(:relevant_category) { create(:skill_category) }
    let(:category_slugs) { [relevant_category.slug] }

    let(:query) do
      <<-GRAPHQL
        mutation {
          createCaseStudyInterest(input: {
            articles: ["#{article1.uid}", "#{article2.uid}"],
            businessType: "B2B",
            goals: ["First", "Second"],
            name: "A Name",
            preferences: ["One", "Two"],
            categories: #{category_slugs}
          }) {
            search {
              id
            }
          }
        }
      GRAPHQL
    end

    it "creates a new interest" do
      request = AdvisableSchema.execute(query, context:)
      uid = request["data"]["createCaseStudyInterest"]["search"]["id"]
      interest = ::CaseStudy::Interest.find_by!(uid:)
      expect(interest.term).to eq("A Name")
      expect(interest.account).to eq(user.account)
      expect(interest.articles).to match_array([article1, article2])
    end
  end
end
