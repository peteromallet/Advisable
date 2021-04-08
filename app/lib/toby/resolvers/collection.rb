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

          filter_class = attribute.class.filters.find { |f| f.name == args[:type] }
          next if filter_class.nil?

          records = if filter_class.block.present?
                      filter_class.block.call(records, args[:value])
                    else
                      filter_class.apply(records, attribute, value: args[:value])
                    end
        end

        records
      end
    end
  end
end
