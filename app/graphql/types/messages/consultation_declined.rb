# frozen_string_literal: true

module Types
  module Messages
    class ConsultationDeclined < Types::BaseType
      implements Types::MessageInterface
      graphql_name "ConsultationDeclinedMessage"

      field :consultation, Types::ConsultationType, null: true
    end
  end
end
