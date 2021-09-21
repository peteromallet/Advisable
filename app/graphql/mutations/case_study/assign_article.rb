# frozen_string_literal: true

module Mutations
  module CaseStudy
    class AssignArticle < Mutations::BaseMutation
      description "Assign a Case Study Article to be saved or archived."
      graphql_name "AssignCaseStudyArticle"

      argument :action, String, required: true
      argument :article, ID, required: true
      argument :feedback, String, required: false
      argument :search, ID, required: false

      field :article, Types::CaseStudy::Article, null: false

      def authorized?(**_args)
        requires_client!
      end

      def resolve(article:, action:, **args)
        article = ::CaseStudy::Article.find_by!(uid: article)
        search = ::CaseStudy::Search.find_by!(uid: args[:search]) if args[:search]

        case action
        when "archive"
          search.update!(archived: search.archived + [article.id])
        when "unarchive"
          search.update!(archived: search.archived - [article.id])
        end

        if args[:feedback] && search
          ::CaseStudy::SearchFeedback.create!(
            search: search,
            article: article,
            feedback: args[:feedback]
          )
        end

        {article: article}
      end
    end
  end
end
