# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    include Helpers::Authentication
    include CurrentUserUtilities

    argument_class(Types::BaseArgument)
  end
end
