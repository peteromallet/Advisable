# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::AssignArticle do
  let(:search) { create(:case_study_search) }
  let(:user) { search.user }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }
  let(:action) { "" }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
      mutation {
        assignCaseStudyArticle(input: {
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
    let(:action) { "archive" }
    let(:extra) { "search: \"#{search.uid}\"" }

    it "archives the article to the search" do
      response = AdvisableSchema.execute(query, context: context)
      r_article = response["data"]["assignCaseStudyArticle"]["article"]
      expect(r_article["id"]).to eq(article.uid)
      expect(search.reload.archived).to include(article.id)
    end

    context "when feedback provided" do
      let(:text) { "I knew exactly what to do. But in a much more real sense, I had no idea what to do." }
      let(:extra) { "feedback: \"#{text}\", search: \"#{search.uid}\"" }

      it "creates SearchFeedback" do
        response = AdvisableSchema.execute(query, context: context)
        r_article = response["data"]["assignCaseStudyArticle"]["article"]
        expect(r_article["id"]).to eq(article.uid)
        feedback = search.search_feedbacks.first
        expect(feedback.article).to eq(article)
        expect(feedback.feedback).to eq(text)
      end
    end
  end

  describe "action: unarchive" do
    let(:action) { "unarchive" }
    let(:extra) { "search: \"#{search.uid}\"" }

    it "unarchives the article to the search" do
      search.update(archived: [article.id])
      response = AdvisableSchema.execute(query, context: context)
      r_article = response["data"]["assignCaseStudyArticle"]["article"]
      expect(r_article["id"]).to eq(article.uid)
      expect(search.reload.archived).not_to include(article.id)
    end
  end

  context "when shared article" do
    let(:shared_article) { create(:case_study_shared_article, shared_with: user) }
    let(:article) { shared_article.article }

    describe "action: archive" do
      let(:action) { "archive" }

      it "archives the article" do
        expect(::CaseStudy::ArchivedArticle.where(user: user, article: shared_article.article)).to be_empty
        response = AdvisableSchema.execute(query, context: context)
        r_article = response["data"]["assignCaseStudyArticle"]["article"]
        expect(r_article["id"]).to eq(shared_article.article.uid)
        expect(::CaseStudy::ArchivedArticle.where(user: user, article: shared_article.article)).not_to be_empty
      end
    end

    describe "action: unarchive" do
      let(:action) { "unarchive" }

      it "unarchives the article" do
        create(:case_study_archived_article, user: search.user, article: article)
        response = AdvisableSchema.execute(query, context: context)
        r_article = response["data"]["assignCaseStudyArticle"]["article"]
        expect(r_article["id"]).to eq(shared_article.article.uid)
        expect(::CaseStudy::ArchivedArticle.where(user: user, article: shared_article.article)).to be_empty
      end
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
