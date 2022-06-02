# frozen_string_literal: true

module Types
  module Messages
    class InterviewRescheduled < Types::BaseType
      implements Types::MessageInterface
      graphql_name "InterviewRescheduledMessage"

      field :interview, Types::Interview, null: true
    end
  end
end
