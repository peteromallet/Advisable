# frozen_string_literal: true

module Types
  class EventConnection < GraphQL::Types::Relay::BaseConnection
    edge_type(Types::EventEdge)
    description "Relay connection type for event items"

    field :total_count, Integer, null: false, deprecation_reason: "We no longer need the total number of upcoming and ended events"
    def total_count
      object.items&.size
    end
  end
end
