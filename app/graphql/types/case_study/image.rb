# frozen_string_literal: true

module Types
  module CaseStudy
    class Image < Types::BaseType
      description "Represents a case study image"
      graphql_name "CaseStudyImage"

      field :id, ID, null: false
      field :signed_id, String, null: false

      field :url, String, null: true
      def url
        object.record.resized_images_mapping[object.blob_id]
      end
    end
  end
end
