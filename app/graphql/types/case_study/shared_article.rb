# frozen_string_literal: true

module Types
  module CaseStudy
    class SharedArticle < Types::BaseType
      graphql_name "CaseStudySharedArticle"
      description "Type definition for CaseStudy::SharedArticle"

      field :id, ID, null: false, method: :uid
      field :article, Article, null: false
      field :shared_with, Types::User, null: false
      field :shared_by, Types::User, null: true
      field :message, String, null: true
    end
  end
end
