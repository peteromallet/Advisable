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

      def read(resource)
        resource.public_send(name)
      end

      def write(resource, value)
        resource.public_send("#{name}=", value)
      end

      def filter(records, filters)
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

        def filter_type
          return nil if filters.empty?

          @filter_type ||= begin
            root = self
            Class.new(GraphQL::Schema::InputObject) do
              graphql_name("#{root.name.split('::').last}Filter")
              root.filters.each do |filter, type|
                argument filter, type, required: false
              end
            end
          end
        end

        def attribute_type
          @attribute_type ||= begin
            root = self
            Class.new(GraphQL::Schema::Object) do
              graphql_name("#{root.name.split('::').last}Attribute")
              field :name, GraphQL::Types::String, null: false
            end
          end
        end
      end
    end
  end
end
