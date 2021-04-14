# frozen_string_literal: true

module Mutations
  module CaseStudy
    class Approve < Mutations::BaseMutation
      description "Approve a Case Study as a Specialist."
      graphql_name "ApproveCaseStudy"

      argument :id, ID, required: true

      field :article, Types::CaseStudy::ArticleType, null: false

      def authorized?(id:)
        article = ::CaseStudy::Article.find(id)
        policy = ::CaseStudy::ArticlePolicy.new(current_user, article)
        return true if policy.approve?

        ApiError.not_authorized("You do not have permissions to approve this Case Study!")
      end

      def resolve(id:)
        article = ::CaseStudy::Article.find(id)
        article.update(specialist_approved_at: Time.zone.now)

        {article: article}
      end
    end
  end
end
