# frozen_string_literal: true

module Mutations
  module Guild
    class UpdatePostReactions < Mutations::BaseMutation
      class PostReactionType < Types::BaseEnum
        value "NONE"
        value "THANK"
      end

      description "react to a guild post"
      graphql_name "GuildUpdatePostReactions"

      argument :guild_post_id, ID, required: true
      argument :reaction, PostReactionType, required: true

      field :guild_post, Types::Guild::PostInterface, null: true

      def authorized?(**_args)
        requires_accepted_specialist!
      end

      def resolve(guild_post_id:, reaction:)
        post = ::Guild::Post.find(guild_post_id)
        case reaction
        when "NONE"
          post.reactions.find_by(specialist: current_user)&.destroy
        when "THANK"
          reaction = post.reactions.find_or_create_by(specialist: current_user)
          reaction.create_notification!
        end

        {guild_post: post.reload}
      end
    end
  end
end
