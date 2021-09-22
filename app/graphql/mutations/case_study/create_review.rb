# frozen_string_literal: true

module Mutations
  module CaseStudy
    class CreateReview < Mutations::BaseMutation
      description "Create a Review for a Case Study Article."
      graphql_name "CreateCaseStudyReview"

      argument :article, ID, required: true
      argument :comment, String, required: false
      argument :ratings, Types::ReviewRatingsInput, required: false

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
            skills: args.dig(:ratings, :skills),
            availability: args.dig(:ratings, :availability),
            communication: args.dig(:ratings, :communication),
            quality_of_work: args.dig(:ratings, :quality_of_work),
            adherence_to_schedule: args.dig(:ratings, :adherence_to_schedule)
          }
        )

        AttachImageJob.perform_later(review, oauth_viewer.image)

        {review: review}
      end
    end
  end
end
