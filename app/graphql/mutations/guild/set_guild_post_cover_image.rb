# frozen_string_literal: true

module Mutations
  module Guild
    class SetGuildPostCoverImage < Mutations::BaseMutation
      graphql_name "SetGuildPostCoverPhoto"

      argument :attachment, String, required: true
      argument :guild_post, ID, required: true

      field :image, Types::Guild::PostImageType, null: true

      def authorized?(guild_post:, **_args)
        requires_guild_user!
        post = ::Guild::Post.find(guild_post)
        ApiError.not_authorized('You dont have access to this') if post&.specialist != current_user
        true
      end

      def resolve(guild_post:, attachment:)
        post = ::Guild::Post.find(guild_post)

        blob = ::ActiveStorage::Blob.find_signed!(attachment)
        image = blob.attachments.find_by(record: post)
        post.update(cover_photo_id: image.id)

        {image: image.reload}
      end
    end
  end
end
