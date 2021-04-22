# frozen_string_literal: true

module Types
  module CaseStudy
    class SectionType < Types::BaseType
      graphql_name "CaseStudySection"
      description "Type definition for CaseStudy::Section"

      field :id, ID, null: false, method: :uid
      field :type, String, null: false
      field :article, ArticleType, null: false
      field :contents, [ContentType], null: true
    end
  end
end
