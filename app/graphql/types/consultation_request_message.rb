# frozen_string_literal: true

module Types
  class ConsultationRequestMessage < Types::BaseType
    implements Types::MessageInterface

    graphql_name "ConsultationRequestMessage"
    description "Type for the Message model when we have an account and consultation."

    field :author, Types::Account, null: true
    field :consultation, Types::ConsultationType, null: true
  end
end
