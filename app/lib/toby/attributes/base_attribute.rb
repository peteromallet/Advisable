# frozen_string_literal: true

module Toby
  module Attributes
    class BaseAttribute
      attr_reader :name, :options

      def initialize(name, **options)
        @name = name
        @options = options
      end

      def type
        raise "Type not defined"
      end

      def input_type
        raise "Input type not defined"
      end

      def humanized_name
        name.to_s.humanize
      end

      def field
        name.to_s.camelize(:lower)
      end

      def readonly
        options.fetch(:readonly, false)
      end

      # Placeholder for lazy_loading
      def lazy_read(_context, _resource)
        nil
      end

      def read(resource)
        resource.public_send(name)
      end

      def write(resource, value)
        resource.public_send("#{name}=", value)
      end

      def filter(records, _filters)
        records
      end

      class << self
        attr_reader :option_fields

        def option_field(option, type)
          @option_fields ||= {}
          @option_fields[option] = type
        end

        def filter(name, type)
          @filters ||= {}
          @filters[name] = type
        end

        def filters
          @filters || {}
        end

        def attribute_type
          @attribute_type ||= begin
            root = self
            Class.new(GraphQL::Schema::Object) do
              graphql_name("#{root.name.split('::').last}Attribute")
              field :name, GraphQL::Types::String, null: false

              def name
                object.name.to_s.camelize(:lower)
              end
            end
          end
        end
      end
    end
  end
end
