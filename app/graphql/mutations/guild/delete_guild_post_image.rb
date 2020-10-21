class Mutations::Guild::DeleteGuildPostImage < Mutations::BaseMutation
  graphql_name "DeleteGuildPostImage"

  argument :guild_post_image_id, ID, required: true

  field :image, Types::Guild::PostImageType, null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(**args)
    image = Guild::PostImage.find_by(uid: args[:guild_post_image_id])

    if image.post.specialist != current_user
      raise ApiError::NotAuthorized.new('You dont have access to this')
    end

    image.destroy

    {image: image}
  end
end
