# frozen_string_literal: true

module Mutations
  module Guild
    class ResolveGuildPost < Mutations::BaseMutation
      graphql_name "ResolveGuildPost"
      argument :guild_post_id, ID, required: true
      field :success, Boolean, null: true

      def authorized?(**args)
        requires_accepted_specialist!

        @post = ::Guild::Post.find(args[:guild_post_id])
        if @post.specialist != current_user
          ApiError.not_authorized("You dont have access to this")
          return false
        end

        @post
      end

      def resolve(**_args)
        @post.update!(resolved_at: Time.current)
        {success: true}
      end
    end
  end
end
