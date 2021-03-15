# frozen_string_literal: true

module Types
  class EventType < Types::BaseType
    field :title, String, null: false
    field :description, String, null: false
    field :starts_at, GraphQL::Types::ISO8601DateTime, null: false
    field :ends_at, GraphQL::Types::ISO8601DateTime, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :host, Types::SpecialistType, null: false
    field :published, Boolean, null: false
    field :attendees_count, Integer, null: false
    field :attendees, Types::SpecialistType.connection_type, null: false

    field :id, ID, null: false

    def id
      object.uid
    end

    field :cover_photo_url, String, null: true

    def cover_photo_url
      object.resized_cover_photo_url
    end

    field :attending, Boolean, null: false

    def attending
      object.attendees.exists?(current_user.id)
    end
  end
end
