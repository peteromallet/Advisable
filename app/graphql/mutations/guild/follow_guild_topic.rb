# frozen_string_literal: true

module Mutations
  module Guild
    class FollowGuildTopic < Mutations::BaseMutation
      graphql_name "FollowGuildTopic"
      argument :guild_topic_id, ID, required: true

      field :guild_topic, Types::Guild::TopicType, null: true

      def authorized?(**_args)
        requires_guild_user!
      end

      def resolve(guild_topic_id:)
        guild_topic = ::Guild::Topic.published.find_by_slug_or_id(guild_topic_id)
        current_user.subscribe_to!(guild_topic)

        {guild_topic: guild_topic}
      end
    end
  end
end
