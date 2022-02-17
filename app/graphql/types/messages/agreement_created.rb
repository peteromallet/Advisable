# frozen_string_literal: true

module Types
  module Messages
    class AgreementCreated < Types::BaseType
      implements Types::MessageInterface

      graphql_name "AgreementCreatedMessage"

      field :agreement, Types::Agreement, null: false
      field :author, Types::Account, null: true

      def author
        return unless object.author_id

        dataloader.with(::ActiveRecordSource, ::Account).load(object.author_id)
      end
    end
  end
end
