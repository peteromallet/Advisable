# frozen_string_literal: true

module Toby
  module Resolvers
    class Collection < GraphQL::Schema::Resolver
      def resolve(filters: [])
        records = field.resource.model.all

        filters.each do |filter|
          args = filter.arguments.argument_values.transform_values(&:value)
          next unless args.key?(:attribute)

          name = args[:attribute].underscore.to_sym
          attribute = field.resource.attributes.find { |attr| attr.name == name }
          next if attribute.nil?

          filter_class = attribute.class.filters[args[:type]]
          next if filter_class.nil?

          records = filter_class.apply(records, attribute, value: args[:value])
        end

        records
      end
    end
  end
end
