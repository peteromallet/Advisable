# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::Publish do
  let(:article) { create(:case_study_article, published_at: nil) }
  let(:user) { create(:user, :editor) }
  let(:context) { {current_user: user} }

  let(:query) do
    <<-GRAPHQL
      mutation {
        publishCaseStudy(input: {
          id: "#{article.uid}",
        }) {
          article {
            id
          }
        }
      }
    GRAPHQL
  end

  it "sets published_at" do
    expect(article.published_at).to be_nil

    response = AdvisableSchema.execute(query, context: context)
    id = response["data"]["publishCaseStudy"]["article"]["id"]

    expect(id).to eq(article.uid)
    expect(article.reload.published_at).not_to be_nil
  end

  context "when creating a guild post" do
    subject(:publish_query) do
      AdvisableSchema.execute(query, context: context)
    end

    it "creates a guild post" do
      expect do
        publish_query
      end.to change(Guild::CaseStudy, :count).from(0).to(1)
    end

    it "does not create a guild post if one already exists" do
      Guild::CaseStudy.create_from_article!(article)

      expect do
        publish_query
      end.not_to change(Guild::CaseStudy, :count)
    end

    it "creates post labelings for case study skills with labels" do
      case_study_skills = create_list(:case_study_skill, 2, article: article)
      label = create(:label, skill: case_study_skills.first.skill)
      publish_query

      expect(article.guild_post.labels).to eq([label])
    end
  end

  context "when current_user is specialist" do
    let(:user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end

  context "when the user is not an editor" do
    let(:user) { create(:user) }

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
end
