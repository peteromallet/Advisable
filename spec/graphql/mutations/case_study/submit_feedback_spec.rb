# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::SubmitFeedback do
  let(:user) { create(:user) }
  let(:context) { {current_user: user} }
  let(:article) { create(:case_study_article) }
  let(:extra) { "" }

  let(:query) do
    <<-GRAPHQL
      mutation {
        submitCaseStudyArticleFeedback(input: {
          article: "#{article.uid}",
          feedback: "NO, GOD, NO! NOOOOOOOO!",
          #{extra}
        }) {
          article {
            id
          }
        }
      }
    GRAPHQL
  end

  it "saves the feedback on the article" do
    AdvisableSchema.execute(query, context: context)
    feedback = CaseStudy::ArticleFeedback.last
    expect(feedback.article_id).to eq(article.id)
    expect(feedback.skill_id).to be_nil
    expect(feedback.feedback).to eq("NO, GOD, NO! NOOOOOOOO!")
  end

  context "when skill provided" do
    let(:skill) { create(:case_study_skill) }
    let(:extra) { "skill: \"#{skill.uid}\"" }

    it "saves the feedback on the article with skill" do
      AdvisableSchema.execute(query, context: context)
      feedback = CaseStudy::ArticleFeedback.last
      expect(feedback.article_id).to eq(article.id)
      expect(feedback.skill_id).to eq(skill.id)
      expect(feedback.feedback).to eq("NO, GOD, NO! NOOOOOOOO!")
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
