# frozen_string_literal: true

module Types
  module CaseStudy
    class Industry < Types::BaseType
      graphql_name "CaseStudyIndustry"
      description "Type definition for CaseStudy::Industry"

      field :id, ID, null: false, method: :uid

      field :article, Article, null: false
      def article
        dataloader.with(::ActiveRecordSource, ::CaseStudy::Article).load(object.article_id)
      end

      field :industry, Types::IndustryType, null: false
      def industry
        dataloader.with(::ActiveRecordSource, ::Industry).load(object.industry_id)
      end
    end
  end
end
