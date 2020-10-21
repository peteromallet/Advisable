class Mutations::Guild::CreateGuildPostImage < Mutations::BaseMutation
  description "Creates a new guild post image"
  graphql_name "CreateGuildPostImage"

  argument :id, String, required: false
  argument :guild_post_id, ID, required: true
  argument :attachment, String, required: true
  argument :position, Integer, required: false
  argument :cover, Boolean, required: false

  field :image, Types::Guild::PostImageType, null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(**args)
    guild_post = current_user.guild_posts.find_by(id: args[:guild_post_id])

    if guild_post&.specialist != current_user
      raise ApiError::NotAuthorized.new('You dont have access to this')
    end

    image = guild_post.images.create(uid: args[:id], position: args[:position], cover: args[:cover])
    image.image.attach(args[:attachment])

    {image: image}
  end
end
