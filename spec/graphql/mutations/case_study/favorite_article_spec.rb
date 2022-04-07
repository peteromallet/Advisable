# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::FavoriteArticle do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }
  let(:interest) { create(:case_study_interest, account: user.account) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        favoriteCaseStudyArticle(input: {
          interest: "#{interest.uid}",
          article: "#{article.uid}"
        }) {
          success
        }
      }
    GRAPHQL
  end

  it "favorites an article" do
    ::CaseStudy::InterestArticle.create!(article:, interest:)
    response = AdvisableSchema.execute(query, context:)
    success = response["data"]["favoriteCaseStudyArticle"]["success"]
    expect(success).to be(true)
    expect(::CaseStudy::InterestArticle.find_by(article:, interest:).favorite).to be_truthy
  end

  context "when the article is already favorited" do
    it "favorites an article" do
      ::CaseStudy::InterestArticle.create!(article:, interest:, favorite: true)
      response = AdvisableSchema.execute(query, context:)
      success = response["data"]["favoriteCaseStudyArticle"]["success"]
      expect(success).to be(true)
      expect(::CaseStudy::InterestArticle.find_by(article:, interest:).favorite).to be_truthy
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
