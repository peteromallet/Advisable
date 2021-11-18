# frozen_string_literal: true

module Types
  class OauthViewer < Types::BaseType
    field :name, String, null: false
    field :first_name, String, null: false
    field :image, String, null: true
  end
end
