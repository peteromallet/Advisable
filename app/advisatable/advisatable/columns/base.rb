module Advisatable
  module Columns
    class Base
      attr_reader :attribute, :opts

      def initialize(attribute, **opts)
        @attribute = attribute
        @opts = opts
      end

      def type
        raise "Type not defined"
      end

      def input_type
        raise "Input type not defined"
      end

      def name
        attribute.to_s.humanize
      end

      def field
        attribute.to_s.camelize(:lower)
      end

      def readonly
        opts.fetch(:readonly, false)
      end

      def read(resource)
        resource.public_send(attribute)
      end

      def write(resource, value)
        resource.public_send("#{attribute}=", value)
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

        def filter(attribute, type)
          @filters ||= {}
          @filters[attribute] = type
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

        def column_type
          @column_type ||= begin
            root = self
            Class.new(GraphQL::Schema::Object) do
              graphql_name("#{root.name.split('::').last}Column")
              field :name, GraphQL::Types::String, null: false
              field :field, GraphQL::Types::String, null: false
              field :readonly, GraphQL::Types::Boolean, null: false

              (root.option_fields || []).each do |option, type|
                field option, type, null: true

                define_method option do
                  object.opts.fetch(option, nil)&.to_s&.camelize(:lower)
                end
              end
            end
          end
        end
      end
    end
  end
end
