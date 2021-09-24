# frozen_string_literal: true

module Mutations
  module CaseStudy
    class ArchiveArticle < Mutations::BaseMutation
      description "Archive a Case Study Article to be saved or archived."
      graphql_name "ArchiveCaseStudyArticle"

      argument :article, ID, required: true
      argument :feedback, String, required: false
      argument :search, ID, required: true

      field :article, Types::CaseStudy::Article, null: false
      field :search, Types::CaseStudy::Search, null: false

      def authorized?(**_args)
        requires_client!
      end

      def resolve(article:, search:, **args)
        article = ::CaseStudy::Article.find_by!(uid: article)
        search = ::CaseStudy::Search.find_by!(uid: search)

        search.update!(archived: search.archived + [article.id])

        if args[:feedback] && search
          ::CaseStudy::SearchFeedback.create!(
            search: search,
            article: article,
            feedback: args[:feedback]
          )
        end

        {article: article, search: search}
      end
    end
  end
end
