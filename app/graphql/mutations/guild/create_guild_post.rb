# frozen_string_literal: true

module Mutations
  module Guild
    class CreateGuildPost < Mutations::BaseMutation
      description "Creates a new guild post"
      graphql_name "CreateGuildPost"

      # rubocop:disable GraphQL/ExtractInputType
      argument :body, String, required: false
      argument :post_prompt_id, ID, required: false
      argument :title, String, required: false
      argument :type, String, required: true
      # rubocop:enable GraphQL/ExtractInputType

      field :guild_post, ::Types::Guild::PostInterface, null: true

      def authorized?(**_args)
        requires_guild_user!
      end

      def resolve(type: nil, title: nil, body: nil, post_prompt_id: nil)
        guild_post = ::Guild::Post.new(
          title: title,
          body: body,
          type: type,
          specialist_id: current_user.id
        )

        if post_prompt_id
          post_prompt = ::PostPrompt.find(post_prompt_id)
          guild_post.post_prompt = post_prompt
          guild_post.labels << post_prompt.label
        end
        guild_post.save

        {guild_post: guild_post}
      end
    end
  end
end
