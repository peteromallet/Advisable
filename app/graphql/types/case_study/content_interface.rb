# frozen_string_literal: true

module Types
  module CaseStudy
    module ContentInterface
      include Types::BaseInterface
      description "Type definition for CaseStudy::Content"
      field_class BaseField

      orphan_types(ParagraphContent, HeadingContent, ImagesContent, LinksContent, ResultsContent)

      field :id, ID, null: false, method: :uid
      field :section, Section, null: false

      definition_methods do
        def resolve_type(object, _context)
          "Types::CaseStudy::#{object.type.demodulize}".constantize
        end
      end
    end
  end
end
