# frozen_string_literal: true

module Mutations
  module Guild
    class DeleteGuildPostImage < Mutations::BaseMutation
      graphql_name "DeleteGuildPostImage"

      argument :guild_post_image_id, ID, required: true

      field :success, Boolean, null: true

      def authorized?(**_args)
        requires_accepted_specialist!
      end

      def resolve(**args)
        image = ::Guild::PostImage.find_by(uid: args[:guild_post_image_id])
        return {success: false} if image.blank?

        ApiError.not_authorized("You dont have access to this") if image.post.specialist != current_user

        image.destroy

        {success: true}
      end
    end
  end
end
