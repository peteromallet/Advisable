# frozen_string_literal: true

module Mutations
  module CaseStudy
    class ShareArticle < Mutations::BaseMutation
      description "Share a Case Study Article as the current User."
      graphql_name "ShareCaseStudyArticle"

      argument :article, ID, required: true
      argument :message, String, required: false
      argument :with, ID, required: true

      field :shared_article, Types::CaseStudy::SharedArticle, null: false

      def authorized?(**_args)
        requires_client!
      end

      def resolve(article:, with:, **args)
        article = ::CaseStudy::Article.find_by!(uid: article)
        with = ::User.find_by!(uid: with)
        shared_article = ::CaseStudy::SharedArticle.create(
          article: article,
          shared_with: with,
          shared_by: current_user
        )
        shared_article.message = args[:message] if args[:message].present?

        current_account_responsible_for { shared_article.save! }

        {shared_article: shared_article}
      end
    end
  end
end
