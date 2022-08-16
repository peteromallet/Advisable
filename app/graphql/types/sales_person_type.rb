# frozen_string_literal: true

module Types
  class SalesPersonType < Types::BaseType
    field :id, ID, null: false
    field :first_name, String, null: false
    field :name, String, null: false
    field :image, String, null: true, method: :resized_image_url
  end
end
