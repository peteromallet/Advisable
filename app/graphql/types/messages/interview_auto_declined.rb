# frozen_string_literal: true

module Types
  module Messages
    class InterviewAutoDeclined < Types::BaseType
      implements Types::MessageInterface
      graphql_name "InterviewAutoDeclinedMessage"

      field :interview, Types::Interview, null: true
    end
  end
end
