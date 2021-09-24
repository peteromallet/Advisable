# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::ArchiveArticle do
  let(:search) { create(:case_study_search) }
  let(:user) { search.user }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }
  let(:action) { "" }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
      mutation {
        archiveCaseStudyArticle(input: {
          article: "#{article.uid}",
          search: "#{search.uid}",
          #{extra}
        }) {
          article {
            id
          },
          search {
            id
          }
        }
      }
    GRAPHQL
  end

  it "archives the article to the search" do
    response = AdvisableSchema.execute(query, context: context)
    r_article = response["data"]["archiveCaseStudyArticle"]["article"]
    r_search = response["data"]["archiveCaseStudyArticle"]["search"]
    expect(r_article["id"]).to eq(article.uid)
    expect(r_search["id"]).to eq(search.uid)
    expect(CaseStudy::Search.find_by(uid: r_search["id"]).archived).to include(article.id)
  end

  context "when feedback provided" do
    let(:text) { "I knew exactly what to do. But in a much more real sense, I had no idea what to do." }
    let(:extra) { "feedback: \"#{text}\"" }

    it "creates SearchFeedback" do
      response = AdvisableSchema.execute(query, context: context)
      r_article = response["data"]["archiveCaseStudyArticle"]["article"]
      expect(r_article["id"]).to eq(article.uid)
      feedback = search.search_feedbacks.first
      expect(feedback.article).to eq(article)
      expect(feedback.feedback).to eq(text)
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
