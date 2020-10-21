class Mutations::Guild::UpdateGuildPost < Mutations::BaseMutation
  description "Updates a new guild post"
  graphql_name "UpdateGuildPost"

  argument :guild_post_id, ID, required: true
  argument :body, String, required: false
  argument :title, String, required: false
  argument :publish, Boolean, required: false
  argument :type, String, required: false
  argument :audience_type, String, required: false
  argument :guild_topic_names, [String], required: false

  field :guild_post, Types::Guild::PostInterface, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(**args)
    guild_post = current_user.guild_posts.find(args[:guild_post_id])
    assignable = args.except(:publish, :guild_post_id, :guild_topic_names)

    guild_post.assign_attributes(assignable)

    if (guild_topic_names = args[:guild_topic_names].presence)
      guild_topics = Guild::Topic.where(name: guild_topic_names)
      guild_post.guild_topic_list = guild_topics
    end

    # All multi step edit/updates reset a post back to a draft state unless the :publish bool is included in the payload
    #  which is included in the final step

    guild_post.status = args[:publish] ? "published" : "draft"
    guild_post.save!

    {guild_post: guild_post}
  end
end
