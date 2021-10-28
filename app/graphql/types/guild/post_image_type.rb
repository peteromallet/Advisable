# frozen_string_literal: true

module Types
  module Guild
    class PostImageType < Types::BaseType
      graphql_name "GuildPostImage"

      field :id, ID, null: false
      field :url, String, null: false
      field :cover, Boolean, null: false
      field :position, Integer, null: false

      def id
        object.uid
      end

      def cover
        object.cover || false
      end

      def url
        object.resized_image_url
      end
    end
  end
end
