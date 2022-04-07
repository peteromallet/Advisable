# frozen_string_literal: true

module Mutations
  module CaseStudy
    class UnfavoriteArticle < Mutations::BaseMutation
      graphql_name "UnfavoriteCaseStudyArticle"

      argument :article, ID, required: true
      argument :interest, ID, required: true

      field :success, Boolean, null: false

      def authorized?(interest:, **_args)
        requires_client!

        interest = ::CaseStudy::Interest.find_by!(uid: interest)
        policy = ::CaseStudy::InterestPolicy.new(current_user, interest)
        return true if policy.unfavorite?

        ApiError.not_authorized("You do not have permissions to unfavorite this Case Study!")
      end

      def resolve(article:, interest:)
        article = ::CaseStudy::Article.find_by!(uid: article)
        interest = ::CaseStudy::Interest.find_by!(uid: interest)
        interest_article = interest.interest_articles.find_by!(article:)

        interest_article.update!(favorite: false)

        {success: true}
      end
    end
  end
end
