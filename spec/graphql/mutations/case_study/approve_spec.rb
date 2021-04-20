# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::Approve do
  let(:article) { create(:case_study_article) }
  let(:context) { {current_user: article.specialist} }

  let(:query) do
    <<-GRAPHQL
      mutation {
        approveCaseStudy(input: {
          id: "#{article.uid}",
        }) {
          article {
            id
          }
        }
      }
    GRAPHQL
  end

  it "sets approved_at" do
    expect(article.specialist_approved_at).to be_nil

    response = AdvisableSchema.execute(query, context: context)
    id = response["data"]["approveCaseStudy"]["article"]["id"]

    expect(id).to eq(article.uid)
    expect(article.reload.specialist_approved_at).not_to be_nil
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
