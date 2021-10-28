# frozen_string_literal: true

module Mutations
  module Guild
    class CreateGuildPostImage < Mutations::BaseMutation
      description "Creates a new guild post image"
      graphql_name "CreateGuildPostImage"

      argument :attachment, String, required: true
      argument :cover, Boolean, required: false
      argument :guild_post_id, ID, required: true
      argument :id, String, required: false
      argument :position, Integer, required: false

      field :image, Types::Guild::PostImageType, null: true

      def authorized?(**_args)
        requires_accepted_specialist!
      end

      def resolve(**args)
        guild_post = current_user.guild_posts.find_by(id: args[:guild_post_id])

        ApiError.not_authorized("You dont have access to this") if guild_post&.specialist != current_user

        image = guild_post.images.create(uid: args[:id], position: args[:position], cover: args[:cover])
        image.image.attach(args[:attachment])

        {image: image}
      end
    end
  end
end
