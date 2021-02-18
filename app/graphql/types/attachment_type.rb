# frozen_string_literal: true

module Types
  class AttachmentType < Types::BaseType
    field :id, ID, null: false
    field :url, String, null: true
    field :filename, String, null: true
    field :size, String, null: true
    field :type, String, null: true

    def size
      object.byte_size
    end
  end
end
