# frozen_string_literal: true

module Types
  module Guild
    class PostImageType < Types::BaseType
      graphql_name 'GuildPostImage'
      field :position, Integer, null: false
      field :id, ID, null: false

      field :cover, Boolean, null: false
      def cover
        object.blob_id == object.record.cover_image.blob_id
      end

      field :signed_id, String, null: false
      def signed_id
        object.blob.signed_id
      end

      field :url, String, null: false
      def url
        object.record.resized_images_mapping[object.id]
      end
    end
  end
end
