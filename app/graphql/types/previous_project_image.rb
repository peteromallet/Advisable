# frozen_string_literal: true

module Types
  class PreviousProjectImage < Types::BaseType
    description <<~HEREDOC
      Represents an image attached to a previous project
    HEREDOC

    field :id, ID, null: false

    field :cover, Boolean, null: false
    def cover
      cover_photo = object.record.cover_photo
      blob_id = cover_photo.attached? ? cover_photo.blob_id : object.record.images.first&.blob_id
      object.blob_id == blob_id
    end

    field :signed_id, String, null: false
    def signed_id
      object.blob.signed_id
    end

    field :url, String, null: false
    def url
      if object.record.cover_photo.blob_id == object.blob_id
        object.record.resized_cover_photo_url
      else
        object.record.resized_images_mapping[object.id]
      end
    end
  end
end
