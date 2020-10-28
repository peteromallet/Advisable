class Mutations::Guild::UpdatePostReactions < Mutations::BaseMutation
  class PostReactionType < Types::BaseEnum
    value "NONE"
    value "THANK"
  end

  description "react to a guild post"
  graphql_name "GuildUpdatePostReactions"

  argument :guild_post_id, ID, required: true
  argument :reaction, PostReactionType, required: true

  field :guild_post, Types::Guild::PostInterface, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(guild_post_id:, reaction:)
    post = Guild::Post.find(guild_post_id)
    case reaction
    when "NONE"
      post.reactions.find_by(specialist: current_user)&.destroy
    when "THANK"
      post.reactions.find_or_create_by(specialist: current_user)
    end

    {guild_post: post.reload}
  end
end
