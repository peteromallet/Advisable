# frozen_string_literal: true

module Types
  class EventConnection < GraphQL::Types::Relay::BaseConnection
    edge_type(Types::EventEdge)
    description "Relay connection type for event items"

    field :total_count, Integer, null: false, deprecation_reason: "We only display the number of upcoming events"
    def total_count
      object.items&.size
    end

    field :upcoming_events_count, Integer, null: false
    def upcoming_events_count
      object.items&.upcoming&.size
    end
  end
end
