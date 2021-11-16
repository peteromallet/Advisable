# frozen_string_literal: true

module Toby
  module Resolvers
    class Collection < GraphQL::Schema::Resolver
      include Helpers::Filter

      def resolve(filters: [], sort_by: "created_at", sort_order: "ASC")
        records = field.resource.model.all.order(sort_by => sort_order)
        apply_filters(records, field.resource, filters)
      end
    end
  end
end
