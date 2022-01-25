# frozen_string_literal: true

module Types
  module Messages
    class AgreementAccepted < Types::BaseType
      implements Types::MessageInterface

      graphql_name "AgreementAcceptedMessage"

      field :agreement, Types::Agreement, null: false
    end
  end
end
