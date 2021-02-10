# frozen_string_literal: true

module Types
  class PreviousProjectImage < Types::BaseType
    field :id, ID, null: false
    field :url, String, null: false
    field :cover, Boolean, null: false

    def id
      object.uid
    end

    def cover
      object.cover || false
    end

    def url
      object.resized_image_url
    end
  end
end
