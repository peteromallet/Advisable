# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::Update do
  let(:article) { create(:case_study_article) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        updateCaseStudy(input: {
          id: "#{article.id}",
        }) {
          article {
            id
          }
        }
      }
    GRAPHQL
  end

  context "when the current user is the specialist owner" do
    let(:context) { {current_user: article.specialist} }

    it "updates the article" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"]
      expect(error).to be_nil
    end
  end

  context "when the current user is an editor" do
    let(:context) { {current_user: create(:user, :editor)} }

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
