# frozen_string_literal: true

module Mutations
  module Guild
    class UpdateGuildPostImage < Mutations::BaseMutation
      graphql_name "UpdateGuildPostImage"

      argument :cover, Boolean, required: false
      argument :guild_post_image_id, ID, required: true
      argument :position, Integer, required: false

      field :image, Types::Guild::PostImageType, null: true

      def authorized?(**_args)
        requires_accepted_specialist!
      end

      def resolve(**args)
        image = ::Guild::PostImage.find_by(uid: args[:guild_post_image_id])

        ApiError.not_authorized("You dont have access to this") if image&.post&.specialist != current_user

        image.position = args[:position] if args[:position]
        image.cover = args[:cover] unless args[:cover].nil?
        image.save

        post_cover_image = image.post.cover_image
        post_cover_image.update(cover: false) if post_cover_image && post_cover_image.id != image.id

        {image: image.reload}
      end
    end
  end
end
