# frozen_string_literal: true

module Mutations
  module CaseStudy
    class CreateReview < Mutations::BaseMutation
      description "Create a Review for a Case Study Article."
      graphql_name "CreateCaseStudyReview"

      argument :adherence_to_schedule, Integer, required: false
      argument :article, ID, required: true
      argument :availability, Integer, required: false
      argument :comment, String, required: false
      argument :communication, Integer, required: false
      argument :quality_of_work, Integer, required: false
      argument :skills, Integer, required: false

      field :review, Types::CaseStudyArticleReview, null: true

      def authorized?(article:, **_args)
        requires_oauth_viewer!

        article = ::CaseStudy::Article.find_by!(uid: article)
        return true if article.review.blank?

        ApiError.invalid_request("ARTICLE_HAS_EXISTING_REVIEW", "Article already has a review!")
      end

      def resolve(article:, **args)
        article = ::CaseStudy::Article.find_by!(uid: article)

        review = article.create_review!(
          first_name: oauth_viewer.first_name,
          last_name: oauth_viewer.last_name,
          comment: args[:comment],
          specialist: article.specialist,
          ratings: {
            skills: args[:skills],
            availability: args[:availability],
            communication: args[:communication],
            quality_of_work: args[:quality_of_work],
            adherence_to_schedule: args[:adherence_to_schedule]
          }
        )

        # figure this out
        # object.avatar.attach(io: oauth_viewer.image, filename: filename)

        {review: review}
      end
    end
  end
end
