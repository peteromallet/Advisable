# frozen_string_literal: true

module Types
  module CaseStudy
    class ParagraphContent < Types::BaseType
      graphql_name "Paragraph"
      description "Type definition for CaseStudy::ParagraphContent"
      implements Types::CaseStudy::ContentInterface

      field :text, String, null: true
      def text
        object.content["text"]
      end
    end
  end
end
