# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::Update do
  let(:article) { create(:case_study_article) }
  let(:context) { {current_user: create(:user, :editor)} }

  let(:query) do
    <<-GRAPHQL
      mutation {
        updateCaseStudy(input: {
          id: "#{article.id}",
          sections: [
            {
              type: "execution",
              content: #{content}
            },
            {
              type: "results",
              content: [
                {
                  type: "paragraph",
                  content: {
                    text: "test",
                  }
                }
              ]
            }
          ]
        }) {
          article {
            id
          }
        }
      }
    GRAPHQL
  end
  let(:content) do
    <<-GRAPHQL
      [
        #{heading},
        {
          type: "paragraph",
          content: {
            text: "test",
          }
        },
        {
          type: "images",
          content: {
            images: [
              "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8b4276e7fa0d323419db5769d973501d46bf95eb",
              "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8b4276e7fa0d323419db5769d973501d46bf95eb",
              "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8b4276e7fa0d323419db5769d973501d46bf95eb",
              "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8b4276e7fa0d323419db5769d973501d46bf95eb",
            ]
          }
        },
        {
          type: "results",
          content: {
            results: [
              "one",
              "two",
              "three",
            ]
          }
        }
      ]
    GRAPHQL
  end
  let(:heading) do
    <<-GRAPHQL
      {
        type: "heading",
        content: {
          size: "h1",
          text: "test",
        }
      }
    GRAPHQL
  end

  it "updates the article and saves the position" do
    response = AdvisableSchema.execute(query, context: context)
    expect(response["data"]["updateCaseStudy"]["article"]["id"]).to eq(article.id)

    expect(article.sections.count).to eq(2)
    expect(article.sections.pluck(:type, :position)).to eq([["execution", 0], ["results", 1]])

    contents = article.sections.find_by(position: 0).contents
    expect(contents.count).to eq(4)
    expect(contents.pluck(:type, :position)).to match_array([["CaseStudy::HeadingContent", 0], ["CaseStudy::ImagesContent", 2], ["CaseStudy::ParagraphContent", 1], ["CaseStudy::ResultsContent", 3]])
  end

  context "when content is invalid" do
    let(:heading) do
      <<-GRAPHQL
        {
          type: "heading",
          content: {
            text: "test",
          }
        }
      GRAPHQL
    end

    it "does not update the article" do
      response = AdvisableSchema.execute(query, context: context)
      expect(response["errors"].first["message"]).to eq("Content does not follow the type's requirements")
      expect(article.sections.count).to eq(0)
    end
  end

  context "when the current user is the specialist owner" do
    let(:context) { {current_user: article.specialist} }

    it "updates the article" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"]
      expect(error).to be_nil
    end
  end

  context "when the specialist doesn't have access to the article" do
    let(:context) { {current_user: create(:specialist)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context "when an user is logged in" do
    let(:context) { {current_user: create(:user)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end
end
