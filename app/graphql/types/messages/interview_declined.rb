# frozen_string_literal: true

module Types
  module Messages
    class InterviewDeclined < Types::BaseType
      implements Types::MessageInterface
      graphql_name "InterviewDeclinedMessage"

      field :interview, Types::Interview, null: true
    end
  end
end
