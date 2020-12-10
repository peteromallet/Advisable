class Mutations::Guild::UnfollowGuildTopic < Mutations::BaseMutation
  graphql_name "UnfollowGuildTopic"
  argument :guild_topic_id, ID, required: true

  field :guild_topic, Types::Guild::TopicType, null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(**args)
    guild_topic = Guild::Topic.find(args[:guild_topic_id])

    if current_user.following?(guild_topic)
      current_user.stop_following(guild_topic)
    end

    {guild_topic: guild_topic}
  end
end
