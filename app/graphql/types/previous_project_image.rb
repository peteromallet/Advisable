# frozen_string_literal: true

module Types
  class PreviousProjectImage < Types::BaseType
    field :id, ID, null: false, method: :blob_id

    field :cover, Boolean, null: false
    def cover
      cover_photo = object.record.cover_photo
      blob_id = cover_photo ? cover_photo.blob_id : object.record.images.first&.blob_id
      object.blob_id == blob_id
    end

    field :url, String, null: false
    def url
      object.record.resized_image_url_for(object.blob_id)
    end
  end
end
