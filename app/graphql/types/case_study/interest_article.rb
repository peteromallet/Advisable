# frozen_string_literal: true

module Types
  module CaseStudy
    class InterestArticle < Types::BaseType
      graphql_name "CaseStudyInterestArticle"
      description "Type definition for CaseStudy::InterestArticle"

      field :id, ID, null: false

      field :article, Article, null: false
      def article
        dataloader.with(::ActiveRecordSource, ::CaseStudy::Article).load(object.article_id)
      end

      field :interest, Interest, null: false
      def interest
        dataloader.with(::ActiveRecordSource, ::CaseStudy::Interest).load(object.interest_id)
      end

      field :similarity, Float, null: true
    end
  end
end
