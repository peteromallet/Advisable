# frozen_string_literal: true

module Toby
  module Attributes
    class HasManyThrough < HasMany
      filter :includes, Filters::Includes
      filter :has_none, Filters::HasNone
      extension_field :labeled_by, GraphQL::Types::String

      def lazy_read_class
        Toby::Lazy::Through
      end
    end
  end
end
