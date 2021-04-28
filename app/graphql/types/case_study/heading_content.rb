# frozen_string_literal: true

module Types
  module CaseStudy
    class HeadingContent < Types::BaseType
      graphql_name "Heading"
      description "Type definition for CaseStudy::HeadingContent"
      implements Types::CaseStudy::ContentInterface

      field :size, String, null: true
      def size
        object.content["size"]
      end

      field :text, String, null: true
      def text
        object.content["text"]
      end
    end
  end
end
