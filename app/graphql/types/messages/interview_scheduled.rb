# frozen_string_literal: true

module Types
  module Messages
    class InterviewScheduled < Types::BaseType
      implements Types::MessageInterface
      graphql_name "InterviewScheduledMessage"

      field :interview, Types::Interview, null: true
    end
  end
end
