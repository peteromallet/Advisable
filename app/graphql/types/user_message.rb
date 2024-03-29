# frozen_string_literal: true

module Types
  class UserMessage < Types::BaseType
    implements Types::MessageInterface

    graphql_name "UserMessage"
    description "Type for the Message model when we have an account."

    field :author, Types::Account, null: true
    def author
      return unless object.author_id

      dataloader.with(::ActiveRecordSource, ::Account).load(object.author_id)
    end
  end
end
