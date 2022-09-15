# frozen_string_literal: true

module Types
  module CaseStudy
    class HeadingContent < Types::BaseType
      graphql_name "Heading"
      description "Type definition for CaseStudy::HeadingContent"
      implements Types::CaseStudy::ContentInterface

      field :text, String, null: true
      field :size, String, null: true
    end
  end
end
