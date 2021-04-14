# frozen_string_literal: true

module Types
  module CaseStudy
    class ContentType < Types::BaseType
      graphql_name "CaseStudyContent"
      description "Type definition for CaseStudy::Content"

      field :id, ID, null: false
      field :position, Int, null: false
      field :type, String, null: false
      field :section, SectionType, null: false
      field :content, GraphQL::Types::JSON, null: false
    end
  end
end
