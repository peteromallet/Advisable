# frozen_string_literal: true

module Toby
  class Schema < GraphQL::Schema
    query Toby::Types::QueryType

    lazy_resolve(Toby::LazyAccount, :account)

    # mutation Admin::Types::MutationType
  end
end
