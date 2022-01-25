# frozen_string_literal: true

module Types
  module Messages
    class AgreementDeclined < Types::BaseType
      implements Types::MessageInterface

      graphql_name "AgreementDeclinedMessage"

      field :agreement, Types::Agreement, null: false
    end
  end
end
