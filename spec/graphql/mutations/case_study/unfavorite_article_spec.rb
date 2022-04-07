# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::UnfavoriteArticle do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }
  let(:interest) { create(:case_study_interest, account: user.account) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        unfavoriteCaseStudyArticle(input: {
          interest: "#{interest.uid}",
          article: "#{article.uid}"
        }) {
          success
        }
      }
    GRAPHQL
  end

  it "unfavorites an article" do
    ::CaseStudy::InterestArticle.create!(article:, interest:, favorite: true)
    response = AdvisableSchema.execute(query, context:)
    success = response["data"]["unfavoriteCaseStudyArticle"]["success"]
    expect(success).to be(true)
    expect(::CaseStudy::InterestArticle.find_by(article:, interest:).favorite).to be_falsey
  end

  context "when the article is already unfavorited" do
    it "unfavorites an article" do
      ::CaseStudy::InterestArticle.create!(article:, interest:, favorite: false)
      response = AdvisableSchema.execute(query, context:)
      success = response["data"]["unfavoriteCaseStudyArticle"]["success"]
      expect(success).to be(true)
      expect(::CaseStudy::InterestArticle.find_by(article:, interest:).favorite).to be_falsey
    end
  end

  context "when the article does not exist on the interest" do
    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_FOUND")
    end
  end

  context "when current_user is not owner" do
    let(:interest) { create(:case_study_interest) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when current_user is specialist" do
    let(:user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end
end
