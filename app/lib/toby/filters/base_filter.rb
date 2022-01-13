# frozen_string_literal: true

module Toby
  module Filters
    class BaseFilter
      attr_reader :name, :attribute, :options, :block

      def initialize(name, attribute, **options, &block)
        @name = name.to_s.camelize(:lower)
        @attribute = attribute
        @options = options
        @block = block
      end

      def type
        self.class.name.sub(/^Toby::Filters::/, "").delete("::")
      end

      def nested
        options[:nested] || false
      end

      def apply(**_args)
        raise "Filter class must implement .apply method"
      end
    end
  end
end
