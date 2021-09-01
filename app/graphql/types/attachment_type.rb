# frozen_string_literal: true

module Types
  class AttachmentType < Types::BaseType
    description "Represents an active storage attachment"

    field :id, ID, null: false
    field :filename, String, null: true
    field :size, String, null: true, method: :byte_size
    field :type, String, null: true, method: :content_type
    field :is_image, Boolean, null: false, method: :image?

    field :url, String, null: true
    def url
      object.url
    rescue URI::InvalidURIError
      nil
    end
  end
end
