# frozen_string_literal: true

module Types
  module CaseStudy
    class InterestArticle < Types::BaseType
      graphql_name "CaseStudyInterestArticle"
      description "Type definition for CaseStudy::InterestArticle"

      field :id, ID, null: false
      field :article, Article, null: false
      field :interest, Interest, null: false
      field :similarity, Float, null: true
      field :favorite, Boolean, null: true
    end
  end
end
