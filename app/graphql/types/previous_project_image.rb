# frozen_string_literal: true

module Types
  class PreviousProjectImage < Types::BaseType
    description <<~HEREDOC
      Represents an image attached to a previous project
    HEREDOC

    field :id, ID, null: false
    field :position, Int, null: true

    field :cover, Boolean, null: false
    def cover
      object.blob_id == object.record.cover_photo.blob_id
    end

    field :signed_id, String, null: false
    def signed_id
      object.blob.signed_id
    end

    field :url, String, null: false
    def url
      object.record.resized_images_mapping[object.id]
    end
  end
end
