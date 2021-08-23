# frozen_string_literal: true

module Types
  class SystemMessage < Types::BaseType
    implements Types::MessageInterface

    graphql_name "SystemMessage"
    description "Type for the Message model when we don't have an author."
  end
end
