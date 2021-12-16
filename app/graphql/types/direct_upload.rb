# frozen_string_literal: true

module Types
  class DirectUpload < Types::BaseType
    field :url, String, null: false
    field :name, String, null: false
    field :token, String, null: false
  end
end
