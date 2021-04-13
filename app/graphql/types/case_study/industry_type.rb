# frozen_string_literal: true

module Types
  module CaseStudy
    class IndustryType < Types::BaseType
      graphql_name "CaseStudyIndustry"
      description "Type definition for CaseStudy::Industry"

      field :id, ID, null: false
      field :article, ArticleType, null: true
      field :industry, Types::IndustryType, null: true
    end
  end
end
