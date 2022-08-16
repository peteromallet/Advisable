# frozen_string_literal: true

module Types
  module Guild
    class PostImageType < Types::BaseType
      graphql_name "GuildPostImage"

      field :id, ID, null: false, method: :uid
      field :url, String, null: false, method: :resized_image_url
      field :position, Integer, null: false

      field :cover, Boolean, null: false
      def cover
        object.cover || false
      end
    end
  end
end
