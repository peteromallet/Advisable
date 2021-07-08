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

        case action
        when "archive"
          article.archived_articles.create!(user: current_user)
        when "unarchive"
          article.archived_articles.where(user: current_user).destroy_all
        when "save"
          article.saved_articles.create!(user: current_user)
        when "unsave"
          article.saved_articles.where(user: current_user).destroy_all
        end

        if args[:feedback] && args[:search]
          ::CaseStudy::SearchFeedback.create!(
            search: ::CaseStudy::Search.find_by!(uid: args[:search]),
            article: article,
            feedback: args[:feedback]
          )
        end

        {article: article}
      end
    end
  end
end
