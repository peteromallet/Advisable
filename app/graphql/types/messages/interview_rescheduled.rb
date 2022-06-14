# frozen_string_literal: true

module Types
  module Messages
    class InterviewRescheduled < Types::BaseType
      implements Types::MessageInterface
      graphql_name "InterviewRescheduledMessage"

      field :interview, Types::Interview, null: true
      field :starts_at, GraphQL::Types::ISO8601DateTime, null: true
      def starts_at
        object.metadata["starts_at"]
      end
    end
  end
end
