# frozen_string_literal: true

module Mutations
  module Guild
    class CreateGuildPostImage < Mutations::BaseMutation
      description "Creates a new guild post image"
      graphql_name "CreateGuildPostImage"

      argument :attachment, String, required: true
      argument :cover, Boolean, required: false
      argument :guild_post_id, ID, required: true
      argument :position, Integer, required: false

      field :image, Types::Guild::PostImageType, null: true

      def authorized?(guild_post_id:, **_args)
        requires_guild_user!
        guild_post = current_user.guild_posts.find_by(id: guild_post_id)
        ApiError.not_authorized('You dont have access to this') if guild_post&.specialist != current_user
        true
      end

      def resolve(guild_post_id:, attachment:, **args)
        guild_post = current_user.guild_posts.find_by(id: guild_post_id)

        blob = ActiveStorage::Blob.find_signed!(attachment)
        image = ActiveStorage::Attachment.create!(
          name: "images",
          record: guild_post,
          blob: blob,
          position: args[:position]
        )

        guild_post.update(cover_photo_id: image.id) if args[:cover]

        {image: image}
      end
    end
  end
end
