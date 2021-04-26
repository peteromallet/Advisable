# frozen_string_literal: true

module Types
  class EventConnection < GraphQL::Types::Relay::BaseConnection
    edge_type(Types::EventEdge)
    description "Relay connection type for event items"

    field :total_count, Integer, null: false
    def total_count
      object.items&.size
    end
  end
end
