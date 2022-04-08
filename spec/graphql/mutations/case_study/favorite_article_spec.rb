# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::FavoriteArticle do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        favoriteCaseStudyArticle(input: {
          article: "#{article.uid}"
        }) {
          article {
            id
            isFavorited
          }
        }
      }
    GRAPHQL
  end

  it "favorites an article" do
    expect(::CaseStudy::FavoritedArticle.where(article:, account: user.account)).not_to exist
    response = AdvisableSchema.execute(query, context:)
    favorited = response["data"]["favoriteCaseStudyArticle"]["article"]["isFavorited"]
    expect(favorited).to be(true)
    expect(::CaseStudy::FavoritedArticle.where(article:, account: user.account)).to exist
  end

  context "when the article is already favorited" do
    it "does nothing" do
      ::CaseStudy::FavoritedArticle.create!(article:, account: user.account)
      response = AdvisableSchema.execute(query, context:)
      favorited = response["data"]["favoriteCaseStudyArticle"]["article"]["isFavorited"]
      expect(favorited).to be(true)
      expect(::CaseStudy::FavoritedArticle.where(article:, account: user.account)).to exist
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
