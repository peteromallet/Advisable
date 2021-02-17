# frozen_string_literal: true

module Toby
  class Schema < GraphQL::Schema
    query Toby::Types::QueryType

    (Toby::Lazy.constants - [:Base]).each do |klass|
      lazy_resolve(Toby::Lazy.const_get(klass), :record)
    end

    # mutation Toby::Types::MutationType
  end
end
