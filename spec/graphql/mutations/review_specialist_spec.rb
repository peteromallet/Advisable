# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ReviewSpecialist do
  let(:oauth_viewer) { OauthViewer.new('uid' => 'test', 'provider' => 'linkedin', 'name' => 'John Doe', 'first_name' => 'John', 'last_name' => 'Doe', 'image' => 'image_url') }
  let(:context) { {oauth_viewer: oauth_viewer} }
  let(:specialist) { create(:specialist) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        reviewSpecialist(input: {
          specialist: "#{specialist.uid}",
          comment: "This is a comment",
          companyName: "Death Star Enterprises",
          relationship: "I am your father!",
          ratings: {
            adherenceToSchedule: 3,
            skills: 3,
            availability: 3,
            qualityOfWork: 3,
            communication: 3
          }
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
    uid = response["data"]["reviewSpecialist"]["review"]["id"]
    review = Review.find_by!(uid: uid)

    expect(review.ratings).to eq({"skills" => 3, "availability" => 3, "communication" => 3, "quality_of_work" => 3, "adherence_to_schedule" => 3})
    expect(review.name).to eq("John Doe")
    expect(review.comment).to eq("This is a comment")
    expect(review.company_name).to eq("Death Star Enterprises")
    expect(review.relationship).to eq("I am your father!")
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
