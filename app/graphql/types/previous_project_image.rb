# frozen_string_literal: true

module Types
  class PreviousProjectImage < Types::BaseType
    field :id, ID, null: false, method: :uid

    field :cover, Boolean, null: false

    def cover
      object.cover || false
    end

    field :url, String, null: false, method: :resized_image_url
  end
end
