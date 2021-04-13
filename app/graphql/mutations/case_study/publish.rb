# frozen_string_literal: true

module Mutations
  module CaseStudy
    class Publish < Mutations::BaseMutation
      description "Publish a Case Study as a Specialist."
      graphql_name "PublishCaseStudy"

      argument :id, ID, required: true

      field :success, Boolean, null: true

      def authorized?(id:)
        article = ::CaseStudy::Article.find(id)
        policy = ::CaseStudy::ArticlePolicy.new(current_user, article)
        return true if policy.publish?

        ApiError.not_authorized("You do not have permissions to publish this Case Study!")
      end

      def resolve(id:)
        article = ::CaseStudy::Article.find(id)
        article.update(published_at: Time.zone.now)

        {success: true}
      end
    end
  end
end
