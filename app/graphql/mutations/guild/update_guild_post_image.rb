class Mutations::Guild::UpdateGuildPostImage < Mutations::BaseMutation
  graphql_name "UpdateGuildPostImage"

  argument :guild_post_image_id, ID, required: true
  argument :position, Integer, required: false
  argument :cover, Boolean, required: false

  field :image, Types::Guild::PostImageType, null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(**args)
    image = Guild::PostImage.find_by(uid: args[:guild_post_image_id])

    if image&.post&.specialist != current_user
      raise ApiError::NotAuthorized.new('You dont have access to this')
    end

    image.position = args[:position] if args[:position]
    image.cover = args[:cover] unless args[:cover].nil?
    image.save

    post_cover_image = image.post.cover_image
    if post_cover_image && post_cover_image.id != image.id
      post_cover_image.update(cover: false)
    end

    {image: image.reload}
  end
end
