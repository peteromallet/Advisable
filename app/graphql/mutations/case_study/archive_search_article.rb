# frozen_string_literal: true

module Mutations
  module CaseStudy
    class ArchiveSearchArticle < Mutations::BaseMutation
      description "Archive a Case Study Article on a Case Study Search"
      graphql_name "ArchiveCaseStudySearchArticle"

      argument :article, ID, required: true
      argument :feedback, String, required: false
      argument :search, ID, required: true

      field :success, Boolean, null: true

      def authorized?(search:, **_args)
        requires_client!

        search = ::CaseStudy::Search.find_by!(uid: search)
        policy = ::CaseStudy::SearchPolicy.new(context[:current_user], search)
        return true if policy.archive_article?

        ApiError.not_authorized("You do not have permission to archive article on this search")
      end

      def resolve(search:, article:, **args)
        search = ::CaseStudy::Search.find_by!(uid: search)
        article = ::CaseStudy::Article.find_by!(uid: article)

        search.archived << article.id

        if args[:feedback]
          ::CaseStudy::SearchFeedback.create!(
            search: search,
            article: article,
            feedback: args[:feedback]
          )
        end

        {success: search.save}
      end
    end
  end
end
