# frozen_string_literal: true

module Toby
  module Helpers
    module Filter
      private

      def apply_filters(records, resource, filters)
        filters.each do |filter|
          args = filter.arguments.argument_values.transform_values(&:value)
          next unless args.key?(:attribute)

          name = args[:attribute].underscore.to_sym
          attribute = resource.attributes.find { |attr| attr.name == name }
          next if attribute.nil?

          filter_class = attribute.class.filters.find { |f| f.name == args[:type] }
          next if filter_class.nil?

          records = apply_filter(filter_class, records, attribute, args[:value])
        end
        records
      end

      def apply_filter(filter_class, records, attribute, value)
        if filter_class.block.present?
          filter_class.block.call(records, attribute, value)
        else
          filter_class.apply(records, attribute, value:)
        end
      end
    end
  end
end
