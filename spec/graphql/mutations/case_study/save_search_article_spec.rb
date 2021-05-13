# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::SaveSearchArticle do
  let(:user) { search.user }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }
  let(:search) { create(:case_study_search, saved: [123]) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        saveCaseStudySearchArticle(input: {
          search: "#{search.uid}",
          article: "#{article.uid}"
        }) {
          article {
            id
          }
        }
      }
    GRAPHQL
  end

  it "saves the article to the search" do
    uid = search.uid
    expect(search.saved).to eq([123])
    response = AdvisableSchema.execute(query, context: context)
    r_article = response["data"]["saveCaseStudySearchArticle"]["article"]
    expect(r_article["id"]).to eq(article.uid)
    expect(::CaseStudy::Search.find_by(uid: uid).saved).to match_array([123, article.id])
  end

  context "when current_user is not owner" do
    let(:user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context "when current_user is specialist" do
    let(:user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end
end
