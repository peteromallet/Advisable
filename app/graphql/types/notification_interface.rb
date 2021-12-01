# frozen_string_literal: true

module Types
  module NotificationInterface
    include Types::BaseInterface

    field_class BaseField

    orphan_types Types::Notifications::SuggestedPostNotification

    field :id, ID, null: false do
      description "The unique ID for notification"
    end

    field :read_at, GraphQL::Types::ISO8601DateTime, null: true do
      description "When the notification was read"
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false do
      description "When the notification was created"
    end

    definition_methods do
      def resolve_type(object, _context)
        case object.action
        when "suggested_post" then Types::Notifications::SuggestedPostNotification
        else
          raise "Unknown notification action"
        end
      end
    end
  end
end
