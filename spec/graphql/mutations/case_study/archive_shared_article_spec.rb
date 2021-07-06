# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::ArchiveSharedArticle do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:shared_article) { create(:case_study_shared_article, shared_with: user) }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
      mutation {
        archiveCaseStudySharedArticle(input: {
          sharedArticle: "#{shared_article.uid}",
          #{extra}
        }) {
          sharedArticle {
            id
          }
        }
      }
    GRAPHQL
  end

  it "archives the article and sets shared_by" do
    expect(::CaseStudy::ArchivedArticle.where(user: user, article: shared_article.article)).to be_empty
    response = AdvisableSchema.execute(query, context: context)
    uid = response["data"]["archiveCaseStudySharedArticle"]["sharedArticle"]["id"]
    shared_article.reload
    expect(shared_article.uid).to eq(uid)
    archived = ::CaseStudy::ArchivedArticle.find_by(user: user, article: shared_article.article)
    expect(archived.shared_by).to eq(shared_article.shared_by)
  end

  context "when shared article belongs to a different user" do
    let(:shared_article) { create(:case_study_shared_article) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["message"]
      expect(error).to eq("You do not have permission to archive this shared article")
    end
  end

  context "when unarchive param is true" do
    let(:shared_article) { create(:case_study_shared_article, shared_with: user) }
    let(:extra) { "unarchive: true" }

    it "unarchives the article" do
      create(:case_study_archived_article, user: user, article: shared_article.article)
      expect(::CaseStudy::ArchivedArticle.where(user: user, article: shared_article.article)).not_to be_empty
      response = AdvisableSchema.execute(query, context: context)
      uid = response["data"]["archiveCaseStudySharedArticle"]["sharedArticle"]["id"]
      shared_article.reload
      expect(shared_article.uid).to eq(uid)
      expect(::CaseStudy::ArchivedArticle.where(user: user, article: shared_article.article)).to be_empty
    end
  end

  context "when current_user is specialist" do
    let(:context) { {current_user: create(:specialist)} }

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
