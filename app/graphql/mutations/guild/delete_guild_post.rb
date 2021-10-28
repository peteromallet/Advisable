# frozen_string_literal: true

module Mutations
  module Guild
    class DeleteGuildPost < Mutations::BaseMutation
      graphql_name "DeleteGuildPost"

      argument :guild_post_id, ID, required: true

      field :guild_post, Types::Guild::PostInterface, null: true

      def authorized?(**_args)
        requires_accepted_specialist!
      end

      def resolve(**args)
        guild_post = current_user.guild_posts.find(args[:guild_post_id])
        guild_post.destroy
        {guild_post: guild_post}
      end
    end
  end
end
