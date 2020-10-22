class Mutations::Guild::UpdatePostReactions < Mutations::BaseMutation
  description "Create or delete a post reaction for a post"
  graphql_name "GuildUpdatePostReactions"

  argument :guild_post_id, ID, required: true

  field :guild_post, Types::Guild::PostInterface, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(guild_post_id:)
    guild_post = Guild::Post.find(guild_post_id)
    specialist = context[:current_user]

    reaction = guild_post.reactions.find_or_initialize_by(specialist: specialist)
    if reaction.new_record?
      reaction.save!
    else
      reaction.destroy
    end

    {guild_post: guild_post.reload}
  end
end
