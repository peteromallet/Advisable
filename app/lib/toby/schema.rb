# frozen_string_literal: true

module Toby
  class Schema < GraphQL::Schema
    query Toby::Types::QueryType
    mutation Toby::Types::MutationType

    lazy_resolve(Toby::Lazy::Single, :record)
    lazy_resolve(Toby::Lazy::Multiple, :records)
  end
end
