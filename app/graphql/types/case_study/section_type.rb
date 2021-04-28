# frozen_string_literal: true

module Types
  module CaseStudy
    class SectionType < Types::BaseType
      graphql_name "CaseStudySection"
      description "Type definition for CaseStudy::Section"

      field :id, ID, null: false, method: :uid
      field :type, String, null: false
      field :article, ArticleType, null: false

      field :contents, [Types::CaseStudy::ContentInterface], null: true
      def contents
        object.contents.order(:position)
      end
    end
  end
end
