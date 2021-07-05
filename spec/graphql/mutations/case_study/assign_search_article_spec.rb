# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::AssignSearchArticle do
  let(:user) { search.user }
  let(:context) { {current_user: user} }
  let(:search) { create(:case_study_search) }
  let(:article) { create(:case_study_article) }
  let(:action) { "" }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
      mutation {
        assignCaseStudySearchArticle(input: {
          search: "#{search.uid}",
          article: "#{article.uid}",
          action: "#{action}",
          #{extra}
        }) {
          article {
            id
          }
        }
      }
    GRAPHQL
  end

  describe "action: archive" do
    let(:search) { create(:case_study_search) }
    let(:action) { "archive" }

    it "archives the article to the search" do
      response = AdvisableSchema.execute(query, context: context)
      r_article = response["data"]["assignCaseStudySearchArticle"]["article"]
      expect(r_article["id"]).to eq(article.uid)
      expect(::CaseStudy::ArchivedArticle.where(user: search.user, article: article)).not_to be_empty
    end

    context "when feedback provided" do
      let(:text) { "I knew exactly what to do. But in a much more real sense, I had no idea what to do." }
      let(:extra) { "feedback: \"#{text}\"" }

      it "creates SearchFeedback" do
        response = AdvisableSchema.execute(query, context: context)
        r_article = response["data"]["assignCaseStudySearchArticle"]["article"]
        expect(r_article["id"]).to eq(article.uid)
        feedback = search.search_feedbacks.first
        expect(feedback.article).to eq(article)
        expect(feedback.feedback).to eq(text)
      end
    end
  end

  describe "action: save" do
    let(:search) { create(:case_study_search, saved: [123]) }
    let(:action) { "save" }

    it "saves the article to the search" do
      uid = search.uid
      expect(search.saved).to eq([123])
      response = AdvisableSchema.execute(query, context: context)
      r_article = response["data"]["assignCaseStudySearchArticle"]["article"]
      expect(r_article["id"]).to eq(article.uid)
      expect(::CaseStudy::Search.find_by(uid: uid).saved).to match_array([123, article.id])
    end
  end

  describe "action: unarchive" do
    let(:search) { create(:case_study_search) }
    let(:action) { "unarchive" }

    it "unarchives the article to the search" do
      create(:case_study_archived_article, user: search.user, article: article)
      expect(::CaseStudy::ArchivedArticle.where(user: search.user)).not_to be_empty
      response = AdvisableSchema.execute(query, context: context)
      r_article = response["data"]["assignCaseStudySearchArticle"]["article"]
      expect(r_article["id"]).to eq(article.uid)
      expect(::CaseStudy::ArchivedArticle.where(user: search.user)).to be_empty
    end
  end

  describe "action: unsave" do
    let(:search) { create(:case_study_search, saved: [123, article.id]) }
    let(:action) { "unsave" }

    it "unsaves the article to the search" do
      uid = search.uid
      expect(search.saved).to match_array([123, article.id])
      response = AdvisableSchema.execute(query, context: context)
      r_article = response["data"]["assignCaseStudySearchArticle"]["article"]
      expect(r_article["id"]).to eq(article.uid)
      expect(::CaseStudy::Search.find_by(uid: uid).saved).to eq([123])
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
