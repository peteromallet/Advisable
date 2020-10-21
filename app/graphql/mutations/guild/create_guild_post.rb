class Mutations::Guild::CreateGuildPost < Mutations::BaseMutation
  description "Creates a new guild post"
  graphql_name "CreateGuildPost"

  argument :body, String, required: true
  argument :title, String, required: true

  field :guild_post, Types::Guild::PostInterface, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(title:, body:)
    guild_post = Guild::Post.new(
      title: title,
      body: body,
      specialist_id: current_user.id
    )
    guild_post.save

    {guild_post: guild_post}
  end
end
