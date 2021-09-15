# frozen_string_literal: true

module Mutations
  module CaseStudy
    class SubmitFeedback < Mutations::BaseMutation
      description "Submit feedback on a Case Study Article."
      graphql_name "SubmitCaseStudyArticleFeedback"

      argument :article, ID, required: true
      argument :feedback, String, required: true
      argument :skill, ID, required: false

      field :article, Types::CaseStudy::Article, null: false

      def authorized?(**_args)
        requires_client!
      end

      def resolve(article:, feedback:, **args)
        article = ::CaseStudy::Article.find_by!(uid: article)
        skill = args[:skill] ? ::CaseStudy::Skill.find_by!(uid: args[:skill]) : nil

        ::CaseStudy::ArticleFeedback.create!(
          article: article,
          skill: skill,
          feedback: feedback
        )

        {article: article}
      end
    end
  end
end
