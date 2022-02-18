# frozen_string_literal: true

module Types
  module Messages
    class InterviewRequest < Types::BaseType
      implements Types::MessageInterface

      graphql_name "InterviewRequestMessage"
      description "Type for the Message model when we have an account and interview."

      field :author, Types::Account, null: true
      field :interview, Types::Interview, null: true
    end
  end
end
