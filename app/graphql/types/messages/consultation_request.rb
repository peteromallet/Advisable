# frozen_string_literal: true

module Types
  module Messages
    class ConsultationRequest < Types::BaseType
      implements Types::MessageInterface

      graphql_name "ConsultationRequestMessage"
      description "Type for the Message model when we have an account and consultation."

      field :author, Types::Account, null: true
      field :consultation, Types::ConsultationType, null: true
    end
  end
end
