# frozen_string_literal: true

module Types
  module NotificationInterface
    include Types::BaseInterface

    field_class BaseField

    orphan_types(*Types::Notifications.constants.map { |k| "Types::Notifications::#{k}".constantize })

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
        raise "Unknown notification action" unless Object.const_defined?("Types::Notifications::#{object.action&.camelize}")

        Object.const_get("Types::Notifications::#{object.action.camelize}")
      end
    end
  end
end
