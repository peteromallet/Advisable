# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CaseStudy::CreateReview do
  let(:oauth_viewer) { OauthViewer.new('uid' => 'test', 'provider' => 'linkedin', 'name' => 'John Doe', 'first_name' => 'John', 'last_name' => 'Doe', 'image' => 'image_url') }
  let(:context) { {oauth_viewer: oauth_viewer} }
  let(:article) { create(:case_study_article) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        createCaseStudyReview(input: {
          adherenceToSchedule: 3,
          article: "#{article.uid}",
          availability: 3,
          comment: "This is a comment",
          communication: 3,
          qualityOfWork: 3,
          skills: 3
        }) {
          review {
            id
          }
        }
      }
    GRAPHQL
  end

  it "creates a new review" do
    response = AdvisableSchema.execute(query, context: context)
    uid = response["data"]["createCaseStudyReview"]["review"]["id"]
    review = Review.find_by!(uid: uid)

    expect(review.ratings).to eq({"skills" => 3, "availability" => 3, "communication" => 3, "quality_of_work" => 3, "adherence_to_schedule" => 3})
    expect(review.name).to eq("John Doe")
    expect(review.comment).to eq("This is a comment")
  end

  context "when review already exists" do
    it "returns an error" do
      article.create_review
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("ARTICLE_HAS_EXISTING_REVIEW")
    end
  end

  context "when there is no oauth_viewer" do
    let(:context) { {oauth_viewer: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end
end
