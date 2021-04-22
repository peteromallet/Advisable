# frozen_string_literal: true

module Types
  module CaseStudy
    class IndustryType < Types::BaseType
      graphql_name "CaseStudyIndustry"
      description "Type definition for CaseStudy::Industry"

      field :id, ID, null: false, method: :uid
      field :article, ArticleType, null: false
      field :industry, Types::IndustryType, null: false
    end
  end
end
