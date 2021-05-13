# frozen_string_literal: true

module Mutations
  module Guild
    class DeleteGuildPostImage < Mutations::BaseMutation
      graphql_name "DeleteGuildPostImage"

      argument :guild_post_image_id, ID, required: true

      field :success, Boolean, null: true

      def authorized?(guild_post_image_id:)
        requires_guild_user!
        image = ActiveStorage::Attachment.find(guild_post_image_id)
        ApiError.not_authorized('You dont have access to this') if image.record.specialist != current_user
        true
      end

      def resolve(guild_post_image_id:)
        image = ActiveStorage::Attachment.find(guild_post_image_id)
        return {success: false} if image.blank?

        image.record.update(cover_photo_id: nil) if image.record.cover_photo_id == id.to_i
        image.destroy
        {success: true}
      end
    end
  end
end
