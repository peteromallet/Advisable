# frozen_string_literal: true

module Toby
  module Resolvers
    class Collection < GraphQL::Schema::Resolver
      def resolve(filters: [])
        records = field.resource.model.all

        filters.each do |filter|
          args = filter.arguments.argument_values.transform_values(&:value)
          name = args["attribute"].underscore.to_sym
          attribute = field.resource.attributes.find { |attr| attr.name == name }
          next if attribute.nil?

          filter_class = attribute.class.filters[args["type"].to_sym]
          next if filter_class.nil?

          contents = args["content"].presence || args["contents"].presence
          records = filter_class.apply(records, name, contents)
        end

        records
      end
    end
  end
end
