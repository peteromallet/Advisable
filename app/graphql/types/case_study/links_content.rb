# frozen_string_literal: true

module Types
  module CaseStudy
    class LinksContent < Types::BaseType
      graphql_name "Links"
      description "Type definition for CaseStudy::LinksContent"
      implements Types::CaseStudy::ContentInterface

      field :links, String, null: true
      def links
        object.content["links"]
      end
    end
  end
end
