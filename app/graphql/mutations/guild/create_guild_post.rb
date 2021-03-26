# frozen_string_literal: true

module Mutations
  module Guild
    class CreateGuildPost < Mutations::BaseMutation
      description "Creates a new guild post"
      graphql_name "CreateGuildPost"

      argument :body, String, required: false
      argument :title, String, required: false
      argument :type, String, required: true
      argument :prompt_label_id, ID, required: false

      field :guild_post, ::Types::Guild::PostInterface, null: true

      def authorized?(**_args)
        requires_guild_user!
      end

      def resolve(type: nil, title: nil, body: nil, prompt_label_id: nil)
        guild_post = ::Guild::Post.new(
          title: title,
          body: body,
          type: type,
          specialist_id: current_user.id
        )
        guild_post.prompt_label = ::Label.find(prompt_label_id) if prompt_label_id
        guild_post.save

        {guild_post: guild_post}
      end
    end
  end
end
