# frozen_string_literal: true

module  Types
  class EventEdge < GraphQL::Types::Relay::BaseEdge
    node_type(Types::EventType)
    description "Relay edge type for an Event"
  end
end
