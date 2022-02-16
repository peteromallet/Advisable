# frozen_string_literal: true

module Types
  module Messages
    class InterviewDeclined < Types::BaseType
      implements Types::MessageInterface
      graphql_name "InterviewDeclinedMessage"

      field :consultation, Types::ConsultationType, null: true
    end
  end
end
