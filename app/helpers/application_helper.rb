# frozen_string_literal: true

module ApplicationHelper
  def specialist_image_meta_tags(specialist)
    image = if specialist.cover_photo.attached?
              specialist.cover_photo
            elsif specialist.avatar.attached?
              specialist.avatar
            end

    return unless image

    tag.meta(property: "og:image", content: url_for(image)) +
      tag.meta(property: "twitter:image", content: url_for(image))
  end
end
