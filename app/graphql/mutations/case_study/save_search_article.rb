# frozen_string_literal: true

module Mutations
  module CaseStudy
    class SaveSearchArticle < Mutations::BaseMutation
      description "Save a Case Study Article to a Case Study Search"
      graphql_name "SaveCaseStudySearchArticle"

      argument :article, ID, required: true
      argument :search, ID, required: true

      field :article, Types::CaseStudy::Article, null: false

      def authorized?(search:, **_args)
        requires_client!

        search = ::CaseStudy::Search.find_by!(uid: search)
        policy = ::CaseStudy::SearchPolicy.new(context[:current_user], search)
        return true if policy.save_article?

        ApiError.not_authorized("You do not have permission to save article to this search")
      end

      def resolve(search:, article:)
        search = ::CaseStudy::Search.find_by!(uid: search)
        article = ::CaseStudy::Article.find_by!(uid: article)

        search.saved << article.id

        current_account_responsible_for do
          search.save
        end

        {article: article}
      end
    end
  end
end
