# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::UnfavoriteArticle do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        unfavoriteCaseStudyArticle(input: {
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

  it "unfavorites an article" do
    ::CaseStudy::FavoritedArticle.create!(article:, account: user.account)
    response = AdvisableSchema.execute(query, context:)
    favorited = response["data"]["unfavoriteCaseStudyArticle"]["article"]["isFavorited"]
    expect(favorited).to be_falsey
    expect(::CaseStudy::FavoritedArticle.where(article:, account: user.account)).not_to exist
  end

  context "when the article is already unfavorited" do
    it "does nothing" do
      expect(::CaseStudy::FavoritedArticle.where(article:, account: user.account)).not_to exist
      response = AdvisableSchema.execute(query, context:)
      favorited = response["data"]["unfavoriteCaseStudyArticle"]["article"]["isFavorited"]
      expect(favorited).to be_falsey
      expect(::CaseStudy::FavoritedArticle.where(article:, account: user.account)).not_to exist
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
