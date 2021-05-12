# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::ArchiveSearchArticle do
  let(:user) { search.user }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }
  let(:search) { create(:case_study_search, archived: [123]) }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
      mutation {
        archiveCaseStudySearchArticle(input: {
          search: "#{search.uid}",
          article: "#{article.uid}",
          #{extra}
        }) {
          success
        }
      }
    GRAPHQL
  end

  it "archives the article to the search" do
    uid = search.uid
    expect(search.archived).to eq([123])
    response = AdvisableSchema.execute(query, context: context)
    success = response["data"]["archiveCaseStudySearchArticle"]["success"]
    expect(success).to eq(true)
    expect(::CaseStudy::Search.find_by(uid: uid).archived).to match_array([123, article.id])
  end

  context "when feedback provided" do
    let(:text) { "I knew exactly what to do. But in a much more real sense, I had no idea what to do." }
    let(:extra) { "feedback: \"#{text}\"" }

    it "creates SearchFeedback" do
      response = AdvisableSchema.execute(query, context: context)
      pp response
      success = response["data"]["archiveCaseStudySearchArticle"]["success"]
      expect(success).to eq(true)
      feedback = search.search_feedbacks.first
      expect(feedback.article).to eq(article)
      expect(feedback.feedback).to eq(text)
    end
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
