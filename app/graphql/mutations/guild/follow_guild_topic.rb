class Mutations::Guild::FollowGuildTopic < Mutations::BaseMutation
  graphql_name "FollowGuildTopic"
  argument :guild_topic_id, ID, required: true

  field :guild_topic, Types::Guild::TopicType, null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(**args)
    guild_topic = Guild::Topic.find(args[:guild_topic_id])

    unless current_user.following?(guild_topic)
      current_user.follow(guild_topic)
    end

    {guild_topic: guild_topic}
  end
end
