class Mutations::Guild::DeleteComment < Mutations::BaseMutation
  description "Deletes a guild comment"
  graphql_name "DeleteGuildComment"

  argument :guild_comment_id, ID, required: true
  
  field :guild_comment_id, ID, null: true
  field :errors, [Types::Error], null: true

  def authorized?(guild_comment_id:)
    guild_comment = Guild::Comment.find(guild_comment_id)
    policy = Guild::CommentPolicy.new(context[:current_user], guild_comment)

    return policy.delete_comment || raise(ApiError.not_authorized('You do not have access to this comment'))
  end

  def resolve(guild_comment_id: nil)
    guild_comment = Guild::Comment.find(guild_comment_id)
    guild_comment.destroy!

    { guild_comment_id: guild_comment_id }
  end
end
