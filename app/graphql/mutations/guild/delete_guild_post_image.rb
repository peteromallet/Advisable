# frozen_string_literal: true

class Mutations::Guild::DeleteGuildPostImage < Mutations::BaseMutation
  graphql_name "DeleteGuildPostImage"

  argument :guild_post_image_id, ID, required: true

  field :success, Boolean, null: true

  def authorized?(**args)
    requires_guild_user!
  end

  def resolve(**args)
    image = Guild::PostImage.find_by(uid: args[:guild_post_image_id])
    return {success: false} if image.blank?

    if image.post.specialist != current_user
      ApiError.not_authorized('You dont have access to this')
    end

    image.destroy

    {success: true}
  end
end
