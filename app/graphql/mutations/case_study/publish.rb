# frozen_string_literal: true

module Mutations
  module CaseStudy
    class Publish < Mutations::BaseMutation
      description "Publish a Case Study as a Specialist."
      graphql_name "PublishCaseStudy"

      argument :id, ID, required: true

      field :article, Types::CaseStudy::Article, null: false

      def authorized?(id:)
        article = ::CaseStudy::Article.find_by!(uid: id)
        policy = ::CaseStudy::ArticlePolicy.new(current_user, article)
        return true if policy.publish?

        ApiError.not_authorized("You do not have permissions to publish this Case Study!")
      end

      def resolve(id:)
        article = ::CaseStudy::Article.find_by!(uid: id)

        current_account_responsible_for do
          ActiveRecord::Base.transaction do
            article.update(published_at: Time.zone.now)
            ::Guild::CaseStudy.create_from_article!(article)
          end
        end

        {article: article}
      end
    end
  end
end
