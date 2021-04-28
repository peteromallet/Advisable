# frozen_string_literal: true

module Types
  module CaseStudy
    class ImagesContent < Types::BaseType
      graphql_name "Images"
      description "Type definition for CaseStudy::ImagesContent"
      implements Types::CaseStudy::ContentInterface

      field :images, [Types::CaseStudy::Image], null: true
    end
  end
end
