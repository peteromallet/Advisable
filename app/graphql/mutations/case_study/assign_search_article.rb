# frozen_string_literal: true

module Mutations
  module CaseStudy
    class AssignSearchArticle < Mutations::BaseMutation
      description "Assign a Case Study Article on a Case Study Search to be saved or archived."
      graphql_name "AssignCaseStudySearchArticle"

      argument :action, String, required: true
      argument :article, ID, required: true
      argument :feedback, String, required: false
      argument :search, ID, required: true
      # rubocop:enable GraphQL/ExtractInputType

      field :article, Types::CaseStudy::Article, null: false
      field :search, Types::CaseStudy::Search, null: false

      def authorized?(search:, **_args)
        requires_client!

        search = ::CaseStudy::Search.find_by!(uid: search)
        policy = ::CaseStudy::SearchPolicy.new(current_user, search)
        return true if policy.assign_article?

        ApiError.not_authorized("You do not have permission to assign article on this search")
      end

      def resolve(search:, article:, action:, **args)
        search = ::CaseStudy::Search.find_by!(uid: search)
        article = ::CaseStudy::Article.find_by!(uid: article)

        case action
        when "archive"
          search.archived = search.archived + [article.id]
        when "save"
          search.saved = search.saved + [article.id]
        when "unarchive"
          search.archived = search.archived - [article.id]
        when "unsave"
          search.saved = search.saved - [article.id]
        end

        if args[:feedback]
          ::CaseStudy::SearchFeedback.create!(
            search: search,
            article: article,
            feedback: args[:feedback]
          )
        end

        current_account_responsible_for { search.save }

        {article: article, search: search.reload}
      end
    end
  end
end
