# frozen_string_literal: true

module Subscriptions
  class BaseSubscription < GraphQL::Schema::Subscription
    # include Helpers::Authentication
    # include CurrentUserUtilities

    argument_class(Types::BaseArgument)
  end
end
