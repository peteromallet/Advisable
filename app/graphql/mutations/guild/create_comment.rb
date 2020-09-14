class Mutations::Guild::CreateComment < Mutations::BaseMutation
  description "Creates a new guild comment for a post"
  graphql_name "CreateGuildComment"

  argument :guild_post_id, ID, required: true
  argument :body, String, required: true
  argument :guild_comment_id, ID, required: false do
    description 'An optional parent guild comment id'
  end

  field :guild_comment, Types::Guild::CommentType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    post = Guild::Post.find(args[:guild_post_id])
    policy = Guild::PostPolicy.new(context[:current_user], post)

    return true if policy.create_comment
    return false, { errors: [{ code: 'not_authorized' }] }
    true
  end

  def resolve(guild_post_id:, body:, guild_comment_id: nil)
    post = Guild::Post.find(guild_post_id)
    policy = Guild::PostPolicy.new(context[:current_user], post)

    attrs = {
      specialist: context[:current_user],
      body: body
    }

    if guild_comment_id
      parent_comment = post.parent_comments.find_by(id: guild_comment_id)
      comment_policy = Guild::CommentPolicy.new(context[:current_user], parent_comment)
      attrs.merge!({parent_comment_id: guild_comment_id}) if comment_policy.create_child_comment
    end

    guild_comment = post.comments.build(attrs)
    guild_comment.save

    { guild_comment: guild_comment }
  end
end
