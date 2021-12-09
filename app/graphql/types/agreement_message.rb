# frozen_string_literal: true

module Types
  class AgreementMessage < Types::BaseType
    implements Types::MessageInterface

    graphql_name "AgreementMessage"
    description "Type for Message that has an Agreement associated with it."

    field :agreement, Types::Agreement, null: false
    field :author, Types::Account, null: true
    def author
      return unless object.author_id

      dataloader.with(::ActiveRecordSource, ::Account).load(object.author_id)
    end
  end
end
