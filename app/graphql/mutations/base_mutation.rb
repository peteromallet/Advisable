# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    include Helpers::Authentication
    include UserRequirements

    argument_class(Types::BaseArgument)

    private

    def current_account_responsible_for(&block)
      Logidze.with_responsible(current_account_id, &block)
    end
  end
end
