# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::ShareArticle do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }
  let(:share_with) { create(:user) }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
      mutation {
        shareCaseStudyArticle(input: {
          article: "#{article.uid}",
          with: "#{share_with.uid}",
          #{extra}
        }) {
          sharedArticle {
            id
          }
        }
      }
    GRAPHQL
  end

  it "shares the article" do
    response = AdvisableSchema.execute(query, context: context)
    uid = response["data"]["shareCaseStudyArticle"]["sharedArticle"]["id"]
    share = ::CaseStudy::SharedArticle.find_by!(uid: uid)
    expect(share.article).to eq(article)
    expect(share.shared_with).to eq(share_with)
    expect(share.shared_by).to eq(user)
    expect(share.message).to be_nil
  end

  context "with message" do
    let(:extra) { "message: \"This is amazing!\"" }

    it "shares the article with the message" do
      response = AdvisableSchema.execute(query, context: context)
      uid = response["data"]["shareCaseStudyArticle"]["sharedArticle"]["id"]
      share = ::CaseStudy::SharedArticle.find_by!(uid: uid)
      expect(share.article).to eq(article)
      expect(share.shared_with).to eq(share_with)
      expect(share.shared_by).to eq(user)
      expect(share.message).to eq("This is amazing!")
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
