# frozen_string_literal: true

module Mutations
  module CaseStudy
    class Update < Mutations::BaseMutation
      description "Update a Case Study."
      graphql_name "UpdateCaseStudy"

      argument :id, ID, required: true

      field :article, Types::CaseStudy::ArticleType, null: false

      def authorized?(id:)
        article = ::CaseStudy::Article.find(id)
        policy = ::CaseStudy::ArticlePolicy.new(current_user, article)
        return true if policy.update?

        ApiError.not_authorized("You do not have permissions to update this Case Study!")
      end

      def resolve(id:)
        article = ::CaseStudy::Article.find(id)

        # Figure out how to do this when the types are clear

        {article: article}
      end
    end
  end
end
