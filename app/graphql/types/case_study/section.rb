# frozen_string_literal: true

module Types
  module CaseStudy
    class Section < Types::BaseType
      graphql_name "CaseStudySection"
      description "Type definition for CaseStudy::Section"

      field :id, ID, null: false, method: :uid
      field :type, String, null: false
      field :article, Article, null: false

      field :contents, [Types::CaseStudy::ContentInterface], null: true
      def contents
        object.contents.by_position
      end
    end
  end
end
